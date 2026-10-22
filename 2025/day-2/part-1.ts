import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split(',').map(seq => seq.split('-').map(id => parseInt(id)));


let sum = 0;

for (const [min, max] of input) {
    for (let id = min; id <= max; id++) {

        //console.log(id);

        const s = id.toString();

        if (s.length % 2 !== 0) continue;

        const middle = s.length / 2;
        const left = s.slice(0, middle);
        const right = s.slice(middle);

        if (left === right) sum += id;
    }
}

console.log(sum);