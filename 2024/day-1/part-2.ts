const input = Deno.readTextFileSync('input.txt')
                .split('\n')
                .map(el => el.split('   '));

const left = [], right = [];

for (const line of input) {
    left.push(parseFloat(line[0]));
    right.push(parseFloat(line[1]));
}

let similarityScore = 0;

for (const element of left) {
    let occurences = 0;

    for (const rightElement of right) {
        if (rightElement == element) occurences++;
    }

    similarityScore += (element * occurences);
}

console.log(similarityScore);