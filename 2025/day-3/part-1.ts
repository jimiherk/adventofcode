import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(bank => bank.split(''));

let sum = 0;

for (const bank of input) {
    let maxJoltage = 0;

    for (let i = 0; i < bank.length; i++) {
        for (let j = i + 1; j < bank.length; j++) {
            const pairJoltage = parseInt(bank[i] + bank[j]);
            if (pairJoltage > maxJoltage) maxJoltage = pairJoltage;
        }
    }
    sum += maxJoltage;
}

console.log(sum);