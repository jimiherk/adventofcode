const input = Deno.readTextFileSync('input.txt');

let disk: {empty:boolean, value:null|number, length:number}[] = [];

for (let i = 0; i < input.length; i++) {
    const fileObject = {
        empty: i % 2 == 1,
        value: i % 2 == 0 ? (i / 2) : null,
        length: Number(input[i]),
    };

    if (fileObject.length == 0) continue;

    disk.push(fileObject);
}

const unmovable = [];

while (disk.length) {
    const lastFile = disk.pop();

    if (lastFile.empty) {
        const lastUnmovable = unmovable[unmovable.length - 1];
        if (lastUnmovable && lastUnmovable.empty) {
            lastUnmovable.length = lastFile.length + lastUnmovable.length;
        } else {
            unmovable.push(lastFile);
        }
        continue;
    }

    let movedElement = false;

    for (let i = 0; i < disk.length; i++) {
        const currentFile = disk[i];
        if (currentFile.empty && currentFile.length >= lastFile.length) {
            disk.splice(i, 1, lastFile);
            if (currentFile.length > lastFile.length) {
                disk.splice(i + 1, 0, {empty: true, value: null, length: currentFile.length - lastFile.length});
            }
            disk.push({empty: true, value: null, length: lastFile.length});
            movedElement = true;
            break;
        }
    }

    if (!movedElement) unmovable.push(lastFile);
}

unmovable.concat(disk);
unmovable.reverse();

let checksum = 0;

let blocks = [];

for (const file of unmovable) {
    blocks = blocks.concat(Array(file.length).fill(file.empty ? null : file.value));
}

for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] == null) continue;
    else checksum += i * blocks[i];
}

console.log(checksum);

/*function displayDisk() {
    let string = "";

    for (const file of disk) string += Array(file.length).fill(file.empty ? '.' : file.value).join('');

    string += "   ";

    for (const file of unmovable) string += Array(file.length).fill(file.empty ? '.' : file.value).join('');

    console.log(string);
}*/