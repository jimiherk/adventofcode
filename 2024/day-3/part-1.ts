const input = Deno.readTextFileSync('input.txt');

const matches = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);

let sum = 0;

for (let match of matches!) {
    const numbers = match.match(/[0-9]{1,3}/g);
    sum += (numbers[0] * numbers[1]);
}

console.log(sum);