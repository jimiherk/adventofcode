const input = Deno.readTextFileSync('input.txt')
    .split('\n')
    .map(el => el.split(' ').map(Number));

let safeReports = 0;

for (const report of input) {
    let safeWithElRemoved = false;

    for (let i = 0; i < report.length; i++) {
        const splicedReport = report.toSpliced(i, 1);

        if (isSafe(splicedReport)) safeWithElRemoved = true;
    }

    if (isSafe(report) || safeWithElRemoved) safeReports++;
}

function isSafe(report: number[]) {
    let safe = true;

    if (report[0] > report[1]) {
        // Decreasing
        for (let i = 1; i < report.length; i++) {
            if (report[i - 1] <= report[i] || Math.abs(report[i - 1] - report[i]) < 1 || Math.abs(report[i - 1] - report[i]) > 3) safe = false;
        }
    } else {
        // Increasing
        for (let i = 1; i < report.length; i++) {
            if (report[i] <= report[i - 1] || Math.abs(report[i - 1] - report[i]) < 1 || Math.abs(report[i - 1] - report[i]) > 3) safe = false;
        }
    }

    return safe;
}

console.log(safeReports);