let [map, moves] = Deno.readTextFileSync('input.txt').split('\n\n');
map = map.split('\n').map(el => el.split(''));
moves = [].concat(...(moves.split('\n').map(el => el.split(''))));

type Pointer = "^" | ">" | "v" | "<";

const directions = {
    "^": [-1, 0],
    ">": [0, 1],
    "v": [1, 0],
    "<": [0, -1]
};

function afterChain(position: number[], direction: Pointer) {
    const dir = directions[direction];
    const next = [position[0] + dir[0], position[1] + dir[1]];

    if (map[next[0]][next[1]] == "O") return afterChain(next, direction);
    else if (map[next[0]][next[1]] == "#") return -1;
    else return next;
}

let position: number[];

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == "@") position = [i, j];
    }
}

for (const move of moves) {
    const dir = directions[move];
    const next = [position[0] + dir[0], position[1] + dir[1]];

    if (map[next[0]][next[1]] == 'O') {
        const behindObjects = afterChain(next, move);

        if (behindObjects == -1 || map[behindObjects[0]][behindObjects[1]] !== '.') {
            continue;
        } else {
            map[behindObjects[0]][behindObjects[1]] = 'O';
        }
    } else if (map[next[0]][next[1]] == '#') continue;

    map[position[0]][position[1]] = '.';
    map[next[0]][next[1]] = '@';
    position = next;
}

let sum = 0;

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 'O') {
            sum += (100 * i + j);
        }
    }
}
console.log(sum);