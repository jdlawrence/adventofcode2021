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

    after_fold = []
    for n in range(7):
        row = [0] * cols
        after_fold.append(row)

    for row in range(7):
        for col in range(cols):
            after_fold[row][col] = grid[row][col]
            if after_fold[row][col] == 0:
                after_fold[row][col] = grid[14 - row][col]

    after_fold2 = []
    for n in range(7):
        row = [0] * 5
        after_fold2.append(row)

    for row in range(7):
        for col in range(5):
            after_fold2[row][col] = after_fold[row][col + 5 + 1]
            if after_fold2[row][col] == 0:
                after_fold2[row][col] = after_fold[row][(5 - 1) - col]

    # print(find_size(input))
    j = 108


print(solve(data))
