with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[int(value) for value in row] for row in data]

rounds = 10

def increment_all(input):
    rows = len(input)
    cols = len(input[0])

    for r in range(rows):
        for c in range(cols):
            input[r][c] += 1

def solve(input):
    print(input)
    increment_all(input)
    # for round in range(rounds):
    #     print(round)

print(solve(transformed))