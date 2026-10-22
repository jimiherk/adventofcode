const input = partitionListByN(Deno.readTextFileSync('input.txt')
    .match(/-?[0-9]+/g).map(Number), 4);

const width = 101, height = 103;
const halfWidth = Math.floor(width / 2), halfHeight = Math.floor(height / 2);

const positions = new Map();

for (const robot of input) {
    const v = [robot[2], robot[3]];
    let pos = [robot[0], robot[1]];

    for (let i = 0; i < 100; i++) {
        pos = [pos[0] + v[0], pos[1] + v[1]];

        if (pos[0] >= width) pos[0] = pos[0] - width;
        if (pos[1] >= height) pos[1] = pos[1] - height;

        if (pos[0] < 0) pos[0] = width + pos[0];
        if (pos[1] < 0) pos[1] = height + pos[1];
    }

    if (positions.has(`${pos[0]},${pos[1]}`)) positions.set(`${pos[0]},${pos[1]}`, positions.get(`${pos[0]},${pos[1]}`) + 1);
    else positions.set(`${pos[0]},${pos[1]}`, 1);
}

// Find quadrant
let q1 = 0, q2 = 0, q3 = 0, q4 = 0;
for (const [coords, count]  of positions.entries()) {
    let [x, y] = coords.split(',').map(Number);

    if (x < halfWidth && y < halfHeight) q1 += count;
    else if (x > halfWidth && y < halfHeight) q2 += count;
    else if (x < halfWidth && y > halfHeight) q3 += count;
    else if (x > halfWidth && y > halfHeight) q4 += count;
}

console.log(q1, q2, q3, q4)

console.log(positions)

console.log(q1 * q2 * q3 * q4);

function partitionListByN(list, n) {
    return [list.splice(0, n)].concat(list.length > 0 ? partitionListByN(list, n) : list)
}