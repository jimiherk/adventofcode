import fs from 'fs';
let input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => line.split(',').map(el => parseInt(el)));

type Position = { x: number, y: number, z: number };
type JunctionBox = { circuit: number, pos: Position, connection: number | null };

function distance(p: Position, q: Position) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2));
}

let junctionBoxes = new Map<number, JunctionBox>(),
    circuits = new Map<number, number[]>();

for (let i = 0; i < input.length; i++) {
    junctionBoxes.set(i, { circuit: i, pos: { x: input[i][0], y: input[i][1], z: input[i][2] }, connection: null });
    circuits.set(i, [ i ]);
}

function findClosestPair() {
    let nearestPair: number[] = [], nearestDistance: number = Infinity;
    for (const [pId, p] of junctionBoxes) {
        for (const [qId, q] of junctionBoxes) {
            if (pId == qId) continue;
            if (p.connection === qId || q.connection === pId) continue;

            let d = distance(p.pos, q.pos);

            if (d < nearestDistance) {
                nearestPair = [pId, qId];
                nearestDistance = d;
            }
        }
    }
    return nearestPair;
}

/*function addToCircuit([p, q]: number[]) {
    let pCirc = circuits.get(junctionBoxes.get(p)!.circuit)!,
        qCirc = circuits.get(junctionBoxes.get(q)!.circuit)!;

    circuits.set(junctionBoxes.get(p)!.circuit, [...pCirc, ...qCirc]);
    //junctionBoxes.get(q)!.circuit = junctionBoxes.get(p)!.circuit!;
}
*/

for (let i = 0; i < 10; i++) {
    let [p, q] = findClosestPair();

    let pData = junctionBoxes.get(p),
        qData = junctionBoxes.get(q);

    if (!pData || !qData) throw new Error("jBox is undefined");

    let pCirc = circuits.get(pData.circuit),
        qCirc = circuits.get(qData.circuit);

    if (!pCirc || !qCirc) throw new Error("Circuit is undefined: " + `${p};${pData.circuit};${pCirc} : ${q};${qData.circuit};${qCirc} : ${i}`);


    for (const box of qCirc) {
        let boxData = junctionBoxes.get(box)!;
        junctionBoxes.set(box, {circuit: pData.circuit, pos: boxData.pos, connection: boxData.connection});
    }

    /*junctionBoxes.set(p, { pos: pData.pos, circuit: pData.circuit, connection: q });
    junctionBoxes.set(q, { pos: qData.pos, circuit: qData.circuit, connection: p });*/

    circuits.set(pData.circuit, [...pCirc, ...qCirc]);

    circuits.delete(qData.circuit);

    console.log(p, pData.pos, q, qData.pos);
    console.log(circuits);
}