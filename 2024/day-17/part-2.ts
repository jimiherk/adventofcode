const input = Deno.readTextFileSync('input.txt').match(/[0-9]+/g)!;

const rawInput = input.slice(3, input.length).join(',');

const program = partition(rawInput.split(',').map(Number), 2);

function partition(array: any[], n: number): any[][] {
    return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}

let solutionFound = false;

for (let a = 0; !solutionFound; a++) {
    console.log(a);
    const out = compute({a, b: 0, c: 0});

    if (out == rawInput) {
        solutionFound = true;
        console.log(a);
    }
}

function compute(registers) {
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
    const output = [];
    let pointer = 0;

    while (!eop) {
        const [opcode, operand] = program[pointer];

        operations[opcode](operand);

        if (opcode !== 3 || registers.a === 0) pointer++;

        if (pointer >= program.length) eop = true;
    }

    return output.join(',');

    function combo(op: number) {
        if (op === 0 || op === 1 || op === 2 || op === 3) return op;
        else if (op === 4) return registers.a;
        else if (op === 5) return registers.b;
        else if (op === 6) return registers.c;
        throw new Error(`Invalid combo operand: ${op}`);
    }

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
}