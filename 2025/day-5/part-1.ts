import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n");

const ranges = input[0].split('\n').map((line) => line.split('-').map(num => parseInt(num, 10)));

const ingredients = input[1].split('\n').map(line => parseInt(line));

let fresh = 0;

for (const ingredient of ingredients) {
    for (const [min, max] of ranges) {
        if (ingredient >= min && ingredient <= max) {
            fresh++;
            break;
        }
    }
}

console.log(fresh);