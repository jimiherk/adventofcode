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

let position: [number, number, Guard];

// Determine starting position
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] == '^') position = [i, j, '^'];
    }
}

let outOfBounds = false, distinctPositions = 0;

while(!outOfBounds) {
    let direction = directions[position[2]];
    let futurePosition = [position[0] + direction[0], position[1] + direction[1]];

    if (input[position[0]][position[1]] != "X") {
        input[position[0]][position[1]] = "X";
        distinctPositions++;
    }

    if (futurePosition[0] < 0 || futurePosition[0] >= input.length || futurePosition[1] < 0 || futurePosition[1] >= input[0].length) {
        outOfBounds = true;
        continue;
    }

    if (input[futurePosition[0]][futurePosition[1]] == '#') {
        // Perform turn
        position = [position[0], position[1], direction[2]];
    } else {
        position = [futurePosition[0], futurePosition[1], position[2]]
    }
}

console.log(input);
console.log(distinctPositions);