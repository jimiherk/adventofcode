const input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => {
        el = el.split(': ');
        el[0] = parseInt(el[0]);
        el[1] = el[1].split(' ');
        return el;
    });

console.log(input);

let sum = 0;

const evaluateLeftToRight = (numbers: string[], operators: string[]): number => {
    let result = parseInt(numbers[0]);
    for (let i = 0; i < operators.length; i++) {
        const num = parseInt(numbers[i + 1]);
        if (operators[i] === '+') {
            result += num;
        } else if (operators[i] === '*') {
            result *= num;
        } else if (operators[i] === '|') {
            result = parseInt(result.toString() + num.toString());
        }
    }
    return result;
};

for (const line of input) {
    let valid = false;
    let combos = Array.from(Array(Math.pow(3, line[1].length - 1)).keys())
        .map(el => el.toString(3).padStart(line[1].length - 1, '0'))
        .map(el => el.replaceAll('0', '+').replaceAll('1', '*').replaceAll('2', '|').split(''));

    for (const combo of combos) {
        if (evaluateLeftToRight(line[1], combo) == line[0]) valid = true;
    }

    if (valid) sum += line[0];
}


console.log(sum);