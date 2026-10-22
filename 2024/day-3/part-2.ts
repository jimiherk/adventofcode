const input = Deno.readTextFileSync('input.txt');

const matches = input.match(/(mul\([0-9]{1,3}\,[0-9]{1,3}\))|((don't)|(do))\(\)/g);

let disabled = false;
let sum = 0;

for (const match of matches!) {
    if (match == 'do()') {
        disabled = false;
    } else if (match == 'don\'t()') {
        disabled = true;
    } else if (match.startsWith('mul')) {
        if (disabled) continue;
        else {
            const numbers = match.match(/[0-9]{1,3}/g);
            sum += (numbers[0] * numbers[1]);
        }
    }
}

console.log(sum);