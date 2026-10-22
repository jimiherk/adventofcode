const input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => el.split(''));

let antennas: Map<string, number[][]> = new Map();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        let char = input[i][j];
        if (char === '.' || char === '#') continue;

        if (!antennas.has(char)) antennas.set(char, []);
        antennas.get(char).push([i, j]);
    }
}

for (const [name, locations] of antennas.entries()) {
    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            let A = locations[i], B = locations[j];

            let deltaY = B[0] - A[0], deltaX = B[1] - A[1];

            let antinodes: number[][] = [];

           antinodes = antinodes.concat(getLocations([-deltaY, -deltaX], [A]));
           antinodes = antinodes.concat(getLocations([deltaY, deltaX], [B]));

            for (const antinode of antinodes) {
                input[antinode[0]][antinode[1]] = '#';
            }
        }
    }
}

function getLocations(directions: number[], locations: number[][]) {
    let previous = locations[locations.length - 1];
    let current = [previous[0] + directions[0], previous[1] + directions[1]];

    if (current[0] < 0 || current[0] >= input.length ||
        current[1] < 0 || current[1] >= input[0].length) return locations;

    locations.push(current);

    return getLocations(directions, locations);
}

let count = 0;

for (const row of input) {
    for (const item of row) {
        if (item === '#') {
            count++;
        }
    }
}

console.log(count);