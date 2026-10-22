import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(bank => bank.split(''));

const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
];

let accessible = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] !== '@') continue;
        let adjacent = 0;
        for (const [dy, dx] of directions) {
            const x = j + dx;
            const y = i + dy;
            if (!validCoords(x, y)) continue;
            if (input[y][x] === '@') {
                adjacent++;
            }
        }
        if (adjacent < 4) accessible++;
    }
}

console.log(accessible);

function validCoords(x: number, y: number): boolean {
    return x >= 0 && x < input[0].length && y >= 0 && y < input.length;
}