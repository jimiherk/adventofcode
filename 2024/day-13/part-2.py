import re
from ortools.linear_solver import pywraplp

solver = pywraplp.Solver.CreateSolver('SCIP')
if not solver:
    exit(-1)

def partition_list_by_n(lst, n):
    return [lst[i:i+n] for i in range(0, len(lst), n)]

with open('input.txt', 'r') as file:
    content = file.read()

input_numbers = re.findall(r'\d+', content)
input_numbers = list(map(int, input_numbers))
input_partitioned = partition_list_by_n(input_numbers, 6)

token_sum = 0
prizes_won = 0

for machine in input_partitioned:
    solver.Clear()

    a = solver.IntVar(0, solver.infinity(), "a")
    b = solver.IntVar(0, solver.infinity(), "b")

    solver.Add(machine[4] + 10000000000000 == a * machine[0] + b * machine[2])
    solver.Add(machine[5] + 10000000000000 == a * machine[1] + b * machine[3])

    solver.Minimize(3 * a + b)

    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        token_sum += 3 * a.solution_value() + b.solution_value()
        prizes_won += 1
        print(a.solution_value())
        print(b.solution_value())

print(token_sum)
print(prizes_won)