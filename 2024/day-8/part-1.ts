const input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => el.split(''));

let antennas: Map<string, number[][]> = new Map();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        let char = input[i][j];
        if (char === '.') continue;

        if (!antennas.has(char)) antennas.set(char, []);
        antennas.get(char).push([i, j]);
    }
}

for (const [type, location] of antennas.entries()) {
    const pairs = [];
    for (let i = 0; i < location.length; i++) {
        for (let j = i + 1; j < location.length; j++) {
            let A = location[i], B = location[j];

            let deltaY = B[0] - A[0], deltaX = B[1] - A[1];

            let antinodes = [
                [A[0] - deltaY, A[1] - deltaX],
                [B[0] + deltaY, B[1] + deltaX]
            ];

            antinodes = antinodes.filter(([y, x]) =>
                y >= 0 && y < input.length &&
                x >= 0 && x < input[0].length
            );

            antinodes.forEach(antinode => {
                if (antinode) input[antinode[0]][antinode[1]] = '#';
            });
        }
    }
}

let count = 0;

for (const row of input) {
    for (const el of row) {
        if (el === '#') count++;
    }
}

console.log(count);