import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let dial = 50;
let password = 0;

for (const line of input) {
    const rotation = parseInt(line.slice(1)) % 100;

    if (line.startsWith('R')) dialRight(rotation);
    else if (line.startsWith('L')) dialLeft(rotation);

    if (dial == 0) password++;
}

console.log(password);

function dialRight(rotation: number) {
    dial += rotation;
    if (dial > 99) dial = dial - 100;
}

function dialLeft(rotation: number) {
    dial -= rotation;
    if (dial < 0) dial = 100 + dial;
}