// part-2.ts
import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let dial = 50;
let password = 0;

// 🥀🥀🥀

for (let line of input) {
    const direction = line[0], rotation = parseInt(line.slice(1));

    console.log(direction, rotation, dial, password);

    for (let i = 0; i < rotation; i++) {
        if (direction === 'L') {
            dial = (dial - 1 + 100) % 100;
        } else if (direction === 'R') {
            dial = (dial + 1) % 100;
        }

        if (dial === 0) password++;
    }
}

console.log(password);