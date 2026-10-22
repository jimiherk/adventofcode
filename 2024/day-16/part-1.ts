const input = Deno.readTextFileSync('input.txt').split('\n').map(el => el.split(''));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

let direction = [0, 1];
let start: number[], end: number[];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == 'S') start = [i, j, 0];
        else if (input[i][j] == 'E') end = [i, j];
    }
}

function inBounds(y, x) {
    return y >= 0 && x >= 0 && x < input[0].length && y < input.length;
}

function heuristic(a, b) {
    return Math.abs(a[0] - b[0]) - Math.abs(a[1] - b[1]);
}

const openSet = [];
const closedSet = new Set;


openSet.push(start);

while (openSet.length > 0) {
    const current = openSet.sort((a, b) => a[2] - b[2]).shift();
    const currentKey = `${current[0]},${current[1]}`;

    if (current[0] === end[0] && current[1] === end[1]) {
        const path = [];
        let node = current;
        
    }
}