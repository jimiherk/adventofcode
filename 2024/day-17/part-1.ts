const input = Deno.readTextFileSync('input.txt').match(/[0-9]+/g)!.map(Number);

const registers = {
    a: input[0],
    b: input[1],
    c: input[2],
};
let pointer = 0;

const program = partition(input.slice(3, input.length), 2);

const output = [];

function combo(op: number) {
    if (op === 0 || op === 1 || op === 2 || op === 3) return op;
    else if (op === 4) return registers.a;
    else if (op === 5) return registers.b;
    else if (op === 6) return registers.c;
    throw new Error(`Invalid combo operand: ${op}`);
}

function partition(array: any[], n: number): any[][] {
    return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}

const operations: (operand: number) => void = {
    0: adv,
    1: bxl,
    2: bst,
    3: jnz,
    4: bxc,
    5: out,
    6: bdv,
    7: cdv,
};

let eop = false;

while (!eop) {
    const [opcode, operand] = program[pointer];

    operations[opcode](operand);

    if (opcode !== 3 || registers.a === 0) pointer++;

    if (pointer >= program.length) eop = true;
}

console.log(output.join(','));

function adv(operand: number) {
    registers.a = Math.trunc(registers.a / Math.pow(2, combo(operand)));
}

function bxl(operand: number) {
    registers.b = registers.b ^ operand;
}

function bst(operand: number) {
    registers.b = combo(operand) % 8;
}

function jnz(operand: number) {
    if (registers.a !== 0) pointer = operand;
}

function bxc(_operand: number) {
    registers.b = registers.b ^ registers.c;
}

function out(operand: number) {
    output.push((combo(operand) % 8).toString());
}

function bdv(operand: number) {
    registers.b = Math.trunc(registers.a / Math.pow(2, combo(operand)));
}

function cdv(operand: number) {
    registers.c = Math.trunc(registers.a / Math.pow(2, combo(operand)));
}