const input: string[][] = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(line => line.split(''));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

function isValidPos(x: number, y: number) {
    return x >= 0 && x < input.length && y >= 0 && y < input[0].length;
}

function findCluster(letter: string, start: [number, number], visited: boolean[][]) {
    const queue: [number, number][] = [start];
    const cluster: [number, number][] = [];
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;
        cluster.push([x, y]);

        for (const [dx, dy] of directions) {
            if (isValidPos(x + dx, y + dy) && !visited[x + dx][y + dy] && input[x + dy][y + dy] === letter) {
                visited[x + dx][y + dy] = true;
                queue.push([x + dx, y + dy]);
            }
        }
    }

    return cluster;
}

const visited = Array.from({ length: input.length }, () => Array(input[0].length).fill(false));
let totalCost = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (!visited[i][j]) {
            const cluster = findCluster(input[i][j], [i, j], visited);

            let area = cluster.length;
            let sides: number[][] = [];

            for (const [x, y] of cluster) {
                for (const [dx, dy] of directions) {
                    if (!isValidPos(x + dx, y + dy) || input[x + dx][y + dy] !== input[i][j]) {
                        sides.push([[x, y], [dx, dy]]);
                    }
                }
            }
        }
    }
}

console.log(totalCost);