const schematics = Deno.readTextFileSync('input.txt').split('\n\n');

const keys = [], locks = [];

for (let schematic of schematics) {
    schematic = schematic.split('\n').map(el => el.split(''));

    let key = true;

    let abstract = [];

    for (let x = 0; x < schematic[0].length; x++) {
        if (schematic[0][x] !== '.') key = false;
        abstract.push(0);

        for (let y = 0; y < schematic.length; y++) {
            if (schematic[y][x] === '#') abstract[x]++;
        }
    }

    abstract = abstract.map(el => el - 1);

    key ? keys.push(abstract) : locks.push(abstract);
}

let validPairs = 0;

for (const lock of locks) {
    for (const key of keys) {
        if ([0, 1, 2, 3, 4].every(index => lock[index] + key[index] <= 5)) validPairs++;
    }
}

console.log(validPairs);