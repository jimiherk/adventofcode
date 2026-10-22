import fs from "fs";
const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => line.split(/\s+/).map(number => {
    const res = parseInt(number);
    return isNaN(res) ? number : res;
}));

// @ts-ignore
const operations: '+' | '*' = input.splice(input.length - 1, 1)[0];

let sum = 0;

for (let x = 0; x < input[0].length; x++) {
    let col;
    for (let y = 0; y < input.length; y++) {
        let value: number = input[y][x];
        if (y == 0) {
            col = value;
            continue;
        }
        console.log(x, y, value, col, operations[x])
        col = operations[x] == '+' ? col + value : col * value;
    }
    sum += col;
}

console.log(sum)