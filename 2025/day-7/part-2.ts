import fs from 'fs';
let input: ('S'|'.'|'^'|number)[][] = fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => line.split(''));

function moveBeam(x: number, y: number) {
    if (input[y][x] === '.') {
        input[y][x] = 1;
    } else if (typeof input[y][x] === 'number') {
        input[y][x] = input[y][x] + 1;
    }

    let next = {
        x,
        y: y + 1
    };

    if (next.y >= input.length) return; // Finished

    let nextSymbol = input[next.y][next.x];

    if (nextSymbol === '.') {
        moveBeam(next.x, next.y);
    } else if (nextSymbol === '^') {
        moveBeam(next.x - 1, next.y);
        moveBeam(next.x + 1, next.y);
    }
}

moveBeam(input[0].findIndex(s => s === 'S'), 0);

let sum = 0;

for (const el of input[input.length - 1]) {
    if (typeof el !== "number") continue;

    sum += el;
}

console.log(sum);