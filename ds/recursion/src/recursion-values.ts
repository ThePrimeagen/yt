export enum Dir {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
    None = 4
}

// TODO: EDIT THESE VARIABLES FOR DIFFERENT EXPERIENCES!!!
//
// 1.  map = the map to walk.
// S = start
// * = wall
// E = end
//
//
// 2.  Dirs are the directions you wish to go
//
//
// 3.  log = true will produce the logging file, false = the base
//     implementation.
export const map: string[][] =
`
******S***
*      * E
*      * *
*        *
**********`.
    split("\n").
    // There is one new line at the top of the file, makes it easier to align
    // the map.  The map must be a rectangle of some sorts.
    slice(1).
    map((x: string) => x.split(''));

const dirAmounts = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

export const dirs = [
    [Dir.Left, ...dirAmounts[Dir.Left]],
    [Dir.Down, ...dirAmounts[Dir.Down]],
    [Dir.Right, ...dirAmounts[Dir.Right]],
    [Dir.Up, ...dirAmounts[Dir.Up]],
];

export const runYours = false;

