with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

print(data)

def find_size(input):
    cols = 0
    rows = 0
    for row in input:
        x, y = row.split(',')
        if int(x) > cols:
            cols = int(x)
        if int(y) > rows:
            rows = int(y)

        print(x, y)

    return rows + 1, cols + 1
def solve(input):
    rows = 0
    cols = 0
    grid = []

    rows, cols = find_size(input)

    # Create grid of zeros
    for n in range(rows):
        row = [0] * cols
        grid.append(row)

    # mark grid
    for coord in data:
        col, row = coord.split(',')
        grid[int(row)][int(col)] = 1

    # print(find_size(input))
    j = 108


print(solve(data))
