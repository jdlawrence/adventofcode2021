from pprint import pprint as pp

with open('input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[int(value) for value in row] for row in data]

ROUNDS = 100

def flash(input, row, col):
    rows = len(input)
    cols = len(input[0])

    flash_list = []

    # Increment all neighbors
    for dr, dc in [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]:
        if row + dr > -1 and row + dr < rows and col + dc > -1 and col + dc < cols:
            input[row + dr][col + dc] += 1
            if input[row + dr][col + dc] == 10:
                flash_list.append((row + dr, col + dc))

    # Go through neighbor and, flash those with val > 9
    for r, c in flash_list:
        flash(input, r, c)

def run_step(input):
    rows = len(input)
    cols = len(input[0])

    flash_list = []
    count = 0

    # First, increase the level of each octopus
    for r in range(rows):
        for c in range(cols):
            input[r][c] += 1
            if input[r][c] > 9:
                flash_list.append((r, c))

    # Then, any octopus with an energy level greater than 9 flashes
    for r,c in flash_list:
        flash(input, r, c)

    # Count flashes and reset all flashed octopi to zero
    for r in range(rows):
        for c in range(cols):
            if input[r][c] > 9:
                count += 1
                input[r][c] = 0

    return count

def print_grid(input):
    rows = len(input)
    cols = len(input[0])

    for r in range(rows):
        row = []
        for c in range(cols):
            row.append(input[r][c])
        print(row)

    print('#################')

def solve(input):
    print_grid(input)
    count = 0
    for round in range(ROUNDS):
        count += run_step(input)
        print_grid(input)

    return count
print(solve(transformed))