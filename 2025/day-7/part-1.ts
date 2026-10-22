import fs from 'fs';
let input: ('S'|'.'|'^')[][] = fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => line.split(''));

let splits = 0;

function moveBeam(x: number, y: number) {
    input[y][x] = '|';
    let next = {
        x,
        y: y + 1
    };

    if (next.y >= input.length) return; // Finished

    let nextSymbol = input[next.y][next.x];

    if (nextSymbol === '.') {
        moveBeam(next.x, next.y);
    } else if (nextSymbol === '^') {
        splits++;
        moveBeam(next.x - 1, next.y);
        moveBeam(next.x + 1, next.y);
    }
}

moveBeam(input[0].findIndex(s => s === 'S'), 0);

console.log(splits);