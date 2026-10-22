const input = Deno.readTextFileSync('input.txt');

let str = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < Number(input[i]); j++) str.push(i % 2 == 0 ? (i / 2).toString() : '.');
}

while (str.includes('.')) {

    let lastChar = str.pop();

    if (lastChar == '.') continue;

    const emptyIndex = str.indexOf('.');

    str[emptyIndex] = lastChar;
}

let checksum = 0;

for (let i = 0; i < str.length; i++) {
    checksum += i * str[i];
}

console.log(checksum)