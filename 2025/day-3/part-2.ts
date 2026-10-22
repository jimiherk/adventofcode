import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(bank => bank.split('').map(battery => parseInt(battery)));

let sum = 0;

for (let bank of input) {
    let lastFound = -1;
    let solution = "";

    while (solution.length < 12) {
        let tail = 11 - solution.length;
        let maxBattery = Math.max(...bank.slice(lastFound + 1, bank.length - tail));
        solution += maxBattery.toString();
        lastFound = bank.indexOf(maxBattery, lastFound + 1);
    }

    sum += parseInt(solution);
}

console.log(sum);