import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(bank => bank.split(''));

const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
];

let removed = 0;

function scanAndRemove(grid: string[][]) {
    let changes = false;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] !== '@') continue;
            let adjacent = 0;
            for (const [dy, dx] of directions) {
                const x = j + dx;
                const y = i + dy;
                if (!validCoords(x, y, grid)) continue;
                if (grid[y][x] === '@') {
                    adjacent++;
                }
            }
            if (adjacent < 4) {
                removed++;
                grid[i][j] = 'X';
                changes = true;
            }
        }
    }
    if (changes) scanAndRemove(grid);
}

scanAndRemove(input);

console.log(removed);

function validCoords(x: number, y: number, grid: string[][]): boolean {
    return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}