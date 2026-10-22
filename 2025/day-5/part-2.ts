import fs from "node:fs";
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n")[0].split('\n').map((line) => line.split('-').map(num => parseInt(num, 10)));

type Nullable<T> = T | null;

const ranges = new Map<number, Nullable<{min: number, max: number}>>();

for (const [min, max] of input) {
    ranges.set(ranges.keys().toArray().length > 0 ? Math.max(...ranges.keys()) + 1 : 0, { min, max });
}

console.log(ranges);

for (const key of ranges.keys()) {
    let value = ranges.get(key);

    if (!value) continue;

    /*
    // Get rid of subranges
    for (const [srKey, srValue] of ranges.entries()) {
        if (!srValue || key == srKey) continue;
        if (srValue.min >= value.min && srValue.max <= value.max) ranges.set(srKey, null);
    }
    */

    for (const [orKey, orValue] of ranges.entries()) {
        if (!orValue) continue;
        if ((orValue.min >= value.min && orValue.min <= value.max) || (orValue.max >= value.min && orValue.max <= value.max)) {
            value = { min: Math.min(value.min, orValue.min), max: Math.max(value.max, orValue.max) };
            ranges.set(orKey, null);
        }
    }

    ranges.set(key, value);
}

console.log(ranges);


let fresh = 0;

for (const value of ranges.values()) {
    if (!value) continue;
    fresh += value.max - value.min;
}

console.log(fresh)