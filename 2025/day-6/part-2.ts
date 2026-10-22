import fs from "fs";
let input: string[] | string[][] = fs.readFileSync('input.txt', 'utf-8').split('\n');

function splitAtIndices(line: string, splits: number[]): string[] {
    const parts: string[] = [];
    let last = 0;
    for (const idx of splits) {
        parts.push(line.slice(last, idx));
        last = idx + 1; // Trennzeichen überspringen
    }
    parts.push(line.slice(last)); // Rest hinzufügen
    return parts;
}

let splits = [];

for (let i = 0; i < input[0].length; i++) {
    if (input[0][i] !== ' ') continue;

    if (input.every(line => line[i] === ' ')) splits.push(i);
}

let newInput = [], operations: ('+'|'*')[] = [];

for (let line of input) {
    if (!line.includes('+') && !line.includes('*')) {
        newInput.push(splitAtIndices(line, splits).map(n => n.replaceAll(' ', 'X')));
    } else {
        operations = line.replaceAll(' ', '').split('');
    }
}

input = newInput;

let sum = 0;

for (let x = 0; x < input[0].length; x++) {
    let lines = [], operation = operations[x];
    for (let y = 0; y < input.length; y++) lines.push(input[y][x]);

    let operands: number[] = [];
    for (let l = Math.max(...lines.map(op => op.toString().length)) - 1; l >= 0; l--) {
        let current = "";
        for (const line of lines) if (line[l] !== 'X') current += line[l];
        operands.push(parseInt(current));
    }

    let col;

    for (let i = 0; i < operands.length; i++) {
        let value: number = operands[i];
        if (i == 0) {
            col = value;
            continue;
        }
        col = operation == '+' ? col! + value : col! * value;
    }

    sum += col;
}

console.log(sum);



/*

let sum = 0;

for (let x = 0; x < newInput[0].length; x++) {
    let lines = [], operation = operations[x];
    for (let y = 0; y < newInput.length; y++) lines.push(newInput[y][x]);

    console.log(operation, lines, Math.max(...lines.map(op => op.toString().length)));

    let operands = [];
    for (let l = Math.max(...lines.map(op => op.toString().length)); l >= 0; l--) {
        let current = "";
        for (const line of lines) {
            current += line[l];
        }
        operands.push(parseInt(current));
    }

    console.log(operation, operands)
}*/