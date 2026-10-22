import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim().split(',').map(seq => seq.split('-').map(id => parseInt(id)));

let sum = 0;

for (const [min, max] of input) {
    for (let id = min; id <= max; id++) {
        let valid = true;

        const s = id.toString();

        let divs = divisors(s.length);

        if (s.length === 1) continue;

        for (const d of divs) {
            let substrings = s.match(new RegExp(`.{1,${d}}`, 'g'));

            if (substrings!.every(substring => substring === substrings![0])) valid = false;
        }

        if (!valid) sum += id;
    }
}

function divisors(num: number) {
    let result = [];
    for(let i = 0; i < num; i++) {
        if(i !== num && num % i == 0) {
            result.push(i)
        }
    }
    return result;
}

console.log(sum);