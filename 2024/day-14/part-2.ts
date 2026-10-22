const input = partitionListByN(Deno.readTextFileSync('input.txt')
    .match(/-?[0-9]+/g).map(Number), 4);

const width = 101, height = 103;
const halfWidth = Math.floor(width / 2), halfHeight = Math.floor(height / 2);

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

function afterNSeconds(n: number) {
    const positions = new Map();

    for (const robot of input) {
        const v = [robot[2], robot[3]];
        let pos = [robot[0], robot[1]];

        for (let i = 0; i < n; i++) {
            pos = [pos[0] + v[0], pos[1] + v[1]];

            if (pos[0] >= width) pos[0] = pos[0] - width;
            if (pos[1] >= height) pos[1] = pos[1] - height;

            if (pos[0] < 0) pos[0] = width + pos[0];
            if (pos[1] < 0) pos[1] = height + pos[1];
        }

        if (positions.has(`${pos[0]},${pos[1]}`)) positions.set(`${pos[0]},${pos[1]}`, positions.get(`${pos[0]},${pos[1]}`) + 1);
        else positions.set(`${pos[0]},${pos[1]}`, 1);
    }

    const matrix = Array(height).fill().map(()=>Array(width).fill('. '));

    for (const [coords, _] of positions.entries()) {
        const [x, y] = coords.split(',').map(Number);

        matrix[y][x] = '#';
    }

    return matrix;
}

for (let i = 0; i < 100000; i++) {
    let neighbors = 0;

    const matrix = afterNSeconds(i);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (matrix[y][x] === '#') {
                for (const [dy, dx] of directions) {
                    if (!inBounds(x + dx, y + dy)) continue;
                    if (matrix[y + dy][x + dx] === '#') neighbors++;
                }
            }
        }
    }

    if (neighbors > 200) {
        console.log(i, neighbors);
    }
}

function inBounds(x: number, y: number) {
    return x >= 0 && x < width && y >= 0 && y < height;
}

function partitionListByN(list, n) {
    return [list.splice(0, n)].concat(list.length > 0 ? partitionListByN(list, n) : list)
}