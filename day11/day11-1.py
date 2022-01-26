from pprint import pprint as pp

with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[{'val': int(value), 'flashed': False } for value in row] for row in data]

ROUNDS = 3

def increment_all(input):
    rows = len(input)
    cols = len(input[0])

    for r in range(rows):
        for c in range(cols):
            input[r][c]['val'] += 1

def flash_neighbors(input, row, col):
    rows = len(input)
    cols = len(input[0])

    print('flashing', row, col)
    # print_grid(input)

    # Mark the octopus as flashed
    input[row][col]['flashed'] = True

    # Increment all neighbors
    for (dr, dc) in [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]:
        if row + dr > -1 and row + dr < rows and col + dc > -1 and col + dc < cols:
            # print('row + dr', row + dr, 'col + dc', col + dc)
            input[row + dr][col + dc]['val'] += 1

    # print_grid(input)
    # pp(input)

    # Go through the grid again and call flash_neighbors on all appropriate octopi
    for r in range(rows):
        for c in range(cols):
            if input[r][c]['val'] > 9 and input[r][c]['flashed'] == False:
                # input[r][c]['flashed'] = True
                # flash_neighbors(input, r, c)
                print('jamil')

def run_step(input):
    rows = len(input)
    cols = len(input[0])

    # First, increase the level of each octopus
    for r in range(rows):
        for c in range(cols):
            input[r][c]['val'] += 1

    # Then, go through and flash neighbors
    for r in range(rows):
        for c in range(cols):
            if input[r][c]['val'] > 9:
                flash_neighbors(input, r, c)

    # Finally, go through and set all flashed octopi to a value of zero
    for r in range(rows):
        for c in range(cols):
            input[r][c]['flashed'] = False
            if input[r][c]['val'] > 9:
                input[r][c]['val'] = 0

def print_grid(input):
    rows = len(input)
    cols = len(input[0])

    # First, increase the level of each octopus
    for r in range(rows):
        row = []
        for c in range(cols):
            row.append(input[r][c]['val'])
        print(row)

    print('#################')

def solve(input):
    for round in range(ROUNDS):
        run_step(input)
        print_grid(input)

print(solve(transformed))