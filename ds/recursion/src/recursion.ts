// TODO: FILL THIS IN
//
// THIS IS FOR YOU
function recurseTheMaze(map: string[][], seen: boolean[][], r: number, c: number): boolean {
    throw new Error("You need to fill this in or change the `runYours` variable to `false` for the logging walk.");
}
























import {
    runYours,
    map,
} from "./recursion-values";

import {
    loggedRecurseTheMaze,
} from "./support";

if (!runYours) {
    console.log("Running the custom version of the maze runner that will print each step of the way.");
}

async function runMaze(map: string[][]) {
    const seen: boolean[][] = new Array(map.length).fill(0).map((_: number) => {
        return new Array(map[0].length).fill(false) as boolean[];
    });

    let x: number;
    let y: number;
    outer:
    for (let r = 0; r < map.length; ++r) {
        for (let c = 0; c < map[r].length; ++c) {
            if (map[r][c] === "S") {
                y = r;
                x = c;
                break outer;
            }
        }
    }

    if (!runYours && await loggedRecurseTheMaze(map, seen, y, x) ||
               recurseTheMaze(map, seen, y, x)) {
        console.log("FOUND IT!!!");
    } else {
        console.log("MAZE IS UNSOLVEABLE");
    }
}

runMaze(map);

