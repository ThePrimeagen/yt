import fs from "fs";
import { spawn } from "node:child_process";
import path from "path";

const fsPromise = fs.promises;

// @ts-ignore
const Parser = require('tree-sitter');
// @ts-ignore
const JavaScript = require('tree-sitter-javascript');

const repoPath = process.argv[2];
const cachePath = process.argv[3] || "/tmp";

const parser = new Parser();
parser.setLanguage(JavaScript);

const _2spaceRepos = [
    "git@github.com:microsoft/TypeScript.git",
    "git@github.com:facebook/react.git",
    "git@github.com:solidjs/solid.git",
];

const _4spaceRepos = [
    "git@github.com:BabylonJS/Babylon.js.git",
    "git@github.com:pixijs/pixijs.git",
    "git@github.com:TryGhost/Ghost.git",
];

function isDirectory(pathToFile: string): boolean {
    try {
        return fs.lstatSync(pathToFile).isDirectory();
    } catch (e) {
        return false;
    }

    // I HATE THIS FUNCTION
}

function isTargetfile(pathToFile: string): boolean {
    const ext = path.extname(pathToFile);
    return (ext === ".ts" || ext === ".js") &&
        !pathToFile.endsWith(".d.ts") && !pathToFile.includes("test");
}

function isIgnore(pathToFile: string): boolean {
    return pathToFile.endsWith(".git");
}

function cloneRepo(repo: string): Promise<string> {
    return new Promise((res, rej) => {
        const pathToRepo = `${repoPath}/${path.basename(repo)}`;
        if (isDirectory(pathToRepo)) {
            res(pathToRepo);
            return;
        }

        const gitCommand = `git clone --depth 1 ${repo} ${pathToRepo}`;
        console.log("executing", gitCommand);

        const gitClone = spawn("git", ["clone", "--depth", "1", repo, pathToRepo]);

        gitClone.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        gitClone.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        gitClone.on("close", (code) => {
            if (code > 0) {
                rej(code);
            } else {
                res(pathToRepo);
            }
        });
    });
}
type PosInfo = {
    row: number,
    column: number
}

type TSNode = {
    type: string,
    isNamed: boolean,
    children: TSNode[],
    startPosition: PosInfo,
    endPosition: PosInfo,
}

const indentNodes = {
}

function print(fileLines: string[], start: PosInfo, end: PosInfo) {
    for (let i = start.row; i <= end.row; ++i) {
        console.log(fileLines[i]);
    }
}

const indenters = {
    "statement_block": true,
    "class_declaration": true,
}

function walkNode(node: TSNode, fileLines: string[], indent: number = 0, indents: number[]): void {
    if (node.children) {
        if (indenters[node.type]) {
            indent++;
            //console.log("making it bigger babe", indent);
            //print(fileLines, node.startPosition, node.endPosition);
        }

        if (indents[indent] === undefined) {
            indents[indent] = 0;
        }

        indents[indent]++;

        node.children.forEach(c => {
            walkNode(c, fileLines, indent, indents);
        });

        if (indenters[node.type]) {
            indent--;
            // console.log("its getting smaller", indent);
            //print(fileLines, node.startPosition, node.endPosition);
        }
    }
}

async function processFile(pathToFile: string): Promise<number[]> {
    const file = (await fsPromise.readFile(pathToFile)).toString();
    const tree = parser.parse(file);
    const fileLines = file.split("\n");

    const indents = [];
    // console.log(tree.rootNode.toString());
    walkNode(tree.rootNode, fileLines, 0, indents);

    return indents;
}

function findAllTSFiles(basePath: string): string[] {
    const out = [];

    const files = fs.readdirSync(basePath);
    for (let i = 0; i < files.length; ++i) {
        const filePath = path.join(basePath, files[i]);

        if (isTargetfile(filePath)) {
            out.push(filePath);
        } else if (isDirectory(filePath) && !isIgnore(filePath)) {
            out.push(...findAllTSFiles(filePath));
        } else {
        }
    }

    return out;
}

function getCachePath(repo: string): string {
    return path.join(cachePath, path.basename(repo));
}

async function getRepoStats(repo: string): Promise<number[]> {
    if (fs.existsSync(getCachePath(repo))) {
        return JSON.parse(fs.readFileSync(getCachePath(repo)).toString());
    }

    const pathToRepo = await cloneRepo(repo);
    const files = findAllTSFiles(pathToRepo);

    const res = (await Promise.all(files.map(x => processFile(x)))).reduce((acc, res) => {
        res.forEach((x: number, i: number) => {
            if (acc[i] === undefined) {
                acc[i] = 0;
            }
            acc[i] += x;
        });
        return acc;
    }, []);

    return res;
}

async function run() {
    for (let i = 0; i < _4spaceRepos.length; ++i) {
        const repo = _4spaceRepos[i];
        const res = await getRepoStats(repo);
        console.log("4", repo, res);
        fs.writeFileSync(getCachePath(repo), JSON.stringify(res));
    }

    for (let i = 0; i < _2spaceRepos.length; ++i) {
        const repo = _2spaceRepos[i];
        const res = await getRepoStats(repo);
        console.log("2", repo, res);
        fs.writeFileSync(getCachePath(repo), JSON.stringify(res));
    }
}

run();

