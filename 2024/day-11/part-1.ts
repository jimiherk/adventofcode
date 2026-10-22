let input = Deno.readTextFileSync('input.txt')
    .split(' ')
    .map(Number);

for (let i = 0; i < 25; i++) {
    let newStones = [];

    for (let stone of input) {
        if (stone == 0) newStones.push(1);
        else if (stone.toString().length % 2 == 0) splitAtIndex(stone.toString(), stone.toString().length / 2).forEach(el => newStones.push(Number(el)));
        else newStones.push(stone * 2024);
    }
    input = newStones;
}

console.log(input.length);

function splitAtIndex(value, index) {
    return [value.substring(0, index), value.substring(index)];
}