import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

import {
    runYours,
    dirs,
    Dir,
    map,
} from "./recursion-values";

function printMaze(map: string[][], seen: boolean[][], loc: [number, number], dir: Dir) {
    const printMap = [];

    for (let r = 0; r < map.length; ++r) {
        printMap[r] = [];
        for (let c = 0; c < map[0].length; ++c) {
            if (seen[r][c]) {
                printMap[r][c] = "o";
            }

            else {
                printMap[r][c] = map[r][c];
            }
        }
    }

    printMap[loc[0]][loc[1]] = "@";

    switch (dir) {
        case Dir.Left:
            printMap[loc[0]][loc[1]] = "<";
            break;
        case Dir.Right:
            printMap[loc[0]][loc[1]] = ">";
            break;
        case Dir.Up:
            printMap[loc[0]][loc[1]] = "^";
            break;
        case Dir.Down:
            printMap[loc[0]][loc[1]] = "V";
            break;
    }

    for (let r = 0; r < map.length; ++r) {
        console.log(printMap[r].join(''));
    }
}

function readLine() {
    return new Promise(res => {
        rl.question("> press enter", res);
    });
}

export async function loggedRecurseTheMaze(map: string[][], seen: boolean[][], r: number, c: number): Promise<boolean> {

    if (r < 0 || r >= map.length || c < 0 || c >= map[0].length) {
        return false;
    }

    if (map[r][c] === "*") {
        return false;
    }

    if (seen[r][c]) {
        return false;
    }

    if (map[r][c] === "E") {
        return true;
    }

    printMaze(map, seen, [r, c], Dir.None);

    // 1. mark it
    seen[r][c] = true;
    await readLine();

    let res = false;
    for (let i = 0; i < dirs.length; ++i) {
        printMaze(map, seen, [r, c], dirs[i][0]);
        await readLine();
        res = res = await loggedRecurseTheMaze(map, seen, r + dirs[i][1], c + dirs[i][2]);

        if (res) {
            break;
        }
    }

    return res;
}

