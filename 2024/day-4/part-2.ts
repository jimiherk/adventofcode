const input = Deno.readTextFileSync('input.txt').split('\n').map(el => el.split(''));

let foundX = 0;

for (let row = 0; row < input.length; row++) {
    for(let column = 0; column < input[row].length; column++) {
        if (input[row][column] != "A") continue;

        if (row == 0 || column == 0 || row == input.length - 1 || column == input[0].length - 1) continue;

        const neighbours1 = [input[row-1][column-1], input[row+1][column+1]],
            neighbours2 = [input[row+1][column-1], input[row-1][column+1]];

        if (neighbours1.includes("M") && neighbours1.includes("S") && neighbours2.includes("M") && neighbours2.includes("S")) foundX++;
    }
}

console.log(foundX);