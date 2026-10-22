let input = Deno.readTextFileSync('input.txt')
    .split(' ')
    .map(Number);

let fullMap = new Map();

for (const stone of input) mapIncrease(fullMap, stone, 1);


for (let i = 0; i < 75; i++) {
    const newMap = new Map();

    for (const [stone, occurences] of fullMap.entries()) {
        if (stone == 0) mapIncrease(newMap, 1, occurences);
        else if (stone.toString().length % 2 == 0) splitAtIndex(stone.toString(), stone.toString().length / 2).forEach(el => mapIncrease(newMap, Number(el), occurences));
        else mapIncrease(newMap, stone * 2024, occurences)
    }

    fullMap = newMap;
}

let sum = 0;

for (const [_, occurences] of fullMap.entries()) sum += occurences;

console.log(sum);

function splitAtIndex(value, index) {
    return [value.substring(0, index), value.substring(index)];
}

function mapIncrease(map: Map<number, number>, stone: number, value: number) {
    if (map.has(stone)) map.set(stone, map.get(stone) + value);
    else map.set(stone, value);
}