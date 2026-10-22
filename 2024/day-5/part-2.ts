let [rules, updates] = Deno.readTextFileSync('input.txt')
    .split('\n\n');

rules = rules
    .split('\n')
    .map(el => el.split('|')
        .map(Number));
updates = updates
    .split('\n')
    .map(el => el.split(',')
        .map(Number));

let sum = 0;

for (const update of updates) {
    const relevantRules = rules.filter(([X, Y]) => update.includes(X) && update.includes(Y));
    const graph = new Map();
    const inDegree = new Map();

    for (const page of update) {
        graph.set(page, []);
        inDegree.set(page, 0);
    }

    for (const [X, Y] of relevantRules) {
        graph.get(X).push(Y);
        inDegree.set(Y, inDegree.get(Y) + 1);
    }

    const queue = [];
    const validOrder = [];

    for (const [node, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(node);
    }

    while (queue.length > 0) {
        const current = queue.shift();
        validOrder.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        }
    }

    if (!(validOrder.length === update.length && validOrder.every((page, idx) => page === update[idx]))) {
        sum += validOrder[Math.floor(validOrder.length / 2)];
    }
}

console.log(sum);