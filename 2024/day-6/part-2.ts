let input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => el.split(''));

const directions = {
    "^": [-1, 0, ">"],
    ">": [0, 1, "v"],
    "v": [1, 0, "<"],
    "<": [0, -1, "^"]
};

type Guard = "^" | ">" | "v" | "<";

let initialPosition: [number, number, Guard];

// Find initial position
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] === '^') {
            initialPosition = [i, j, '^'];
        }
    }
}

// Determine path without obstacles
let path = (simulate(structuredClone(input)) as number[][]).map(el => el.toSpliced(2, 1));

let loopCounter = 0;
for (const tile of path.toSpliced(0, 1)) {
    let map = structuredClone(input);

    map[tile[0]][tile[1]] = '#';

    if (simulate(map) === "loop") loopCounter++;
}

console.log(loopCounter);

function simulate(map: string[][]) {
    let position = [...initialPosition], outOfBounds = false, path = [];

    while(!outOfBounds) {
        let direction = directions[position[2]];
        let futurePosition = [position[0] + direction[0], position[1] + direction[1]];

        if (map[position[0]][position[1]] != "X") {
            map[position[0]][position[1]] = "X";
            path.push(position);
        } else if (searchForArray(path, position) != -1) {
            return "loop";
        }

        if (futurePosition[0] < 0 || futurePosition[0] >= map.length || futurePosition[1] < 0 || futurePosition[1] >= map[0].length) {
            outOfBounds = true;
            continue;
        }

        if (map[futurePosition[0]][futurePosition[1]] == '#') {
            // Perform turn
            position = [position[0], position[1], direction[2]];
        } else {
            position = [futurePosition[0], futurePosition[1], position[2]]
        }
    }

    return path;
}

function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
        if(needle.length === haystack[i].length){
            current = haystack[i];
            for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
            if(j === needle.length)
                return i;
        }
    }
    return -1;
}