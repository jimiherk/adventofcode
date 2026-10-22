let [initial, gates] = Deno.readTextFileSync('input.txt').split('\n\n');

initial = initial.split('\n');

const wires = new Map();

for (let wire of initial) {
    wire = wire.split(': ');
    wires.set(wire[0], Boolean(Number(wire[1])));
}

gates = gates.split('\n').map(el => el.split('->'));

let gatemap = new Map();

for (const gate of gates) {
    gate[1] = gate[1].trim();

    gate[0] = gate[0].trim().split(' ');

    if (!wires.has(gate[1])) wires.set(gate[1], null);

    gatemap.set(gate[1], gate[0]);
}

let outputs = Array(Array.from(wires.keys()).filter(el => el.startsWith('z')).length).fill(null);

for (const [wire, _] of wires.entries()) {
    if (wire.startsWith('z')) {
        let number = Number(wire.replace('z', ''));
        outputs[number] = getValue(wire);
    }
}

outputs.reverse();
outputs = outputs.map(el => +el);

console.log(parseInt(outputs.join(''), 2));



function getValue(wire: string) {
    if (wires.get(wire) !== null) return wires.get(wire);

    let gate = gatemap.get(wire);

    let op = gate[1];

    if (op == "AND") return getValue(gate[0]) && getValue(gate[2]);
    else if (op == "OR") return getValue(gate[0]) || getValue(gate[2]);
    else if (op == "XOR") return getValue(gate[0]) != getValue(gate[2]);
}