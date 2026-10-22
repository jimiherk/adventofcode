const input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => el.split('').map(Number));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

const trails = new Map();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] !== 0) continue;

        let trailhead = `${i},${j}`;

        trails.set(trailhead, []);

        findTrail([i, j], trailhead);
    }
}

function findTrail([i, j]: number[], trailhead: string) {
    let currentHeight = input[i][j];

    if (currentHeight === 9) {
        trails.get(trailhead).push(`${i},${j}`);
        return;
    }

    for (const direction of directions) {
        const futureCoordinates = [i + direction[0], j + direction[1]];

        if (futureCoordinates[0] < 0 || futureCoordinates[0] >= input.length || futureCoordinates[1] < 0 || futureCoordinates[1] >= input[0].length) continue;

        if (input[futureCoordinates[0]][futureCoordinates[1]] === currentHeight + 1) {
            findTrail(futureCoordinates, trailhead);
        }
    }
}

let sum = 0;

for (const [_head, ends] of trails.entries()) {
    sum += ends.length;
}

console.log(sum);