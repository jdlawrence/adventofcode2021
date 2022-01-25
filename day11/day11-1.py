from pprint import pprint as pp

with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[{'val': int(value), 'flashed': False } for value in row] for row in data]

rounds = 10

def increment_all(input):
    rows = len(input)
    cols = len(input[0])

    for r in range(rows):
        for c in range(cols):
            input[r][c]['val'] += 1

def run_step(input):
    rows = len(input)
    cols = len(input[0])

    for r in range(rows):
        for c in range(cols):
            input[r][c]['val'] += 1
            if input[r][c]['val'] == 10:
                input[r][c]['flashed'] = True
                input[r][c]['val'] = 0


def solve(input):
    pp(input)
    run_step(input)
    pp('\n')
    pp(input)
    # for round in range(rounds):
    #     print(round)

print(solve(transformed))