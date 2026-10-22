const input = Deno.readTextFileSync('input.txt')
                .split('\n')
                .map(el => el.split('   '));

const left = [], right = [];

for (const line of input) {
    left.push(parseFloat(line[0]));
    right.push(parseFloat(line[1]));
}

left.sort();
right.sort();

let distanceSum = 0;

for (let i = 0; i < left.length; i++) {
    const distance = Math.abs(left[i] - right[i]);

    distanceSum += distance;
}

console.log(distanceSum);