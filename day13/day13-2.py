with open('input.txt') as f:
    data = f.read().strip().split('\n\n')

dots = data[0].split('\n')
folds = data[1].split('\n')

folds = [item.split(' ') for item in folds]
folds = [item[2] for item in folds]
folds = [item.split('=') for item in folds]
folds = [[axis, int(value)] for [axis, value] in folds]

def find_size(input):
    cols = 0
    rows = 0
    for row in input:
        x, y = row.split(',')
        if int(x) > cols:
            cols = int(x)
        if int(y) > rows:
            rows = int(y)

    return rows + 1, cols + 1

def fold(grid, axis, line):
    folded = []
    rows = len(grid)
    cols = len(grid[0])

    if axis == 'x':
        for n in range(rows):
            row = ['0'] * line
            folded.append(row)

        for row in range(rows):
            for col in range(line):
                folded[row][col] = grid[row][col + line + 1]
                if folded[row][col] == '0':
                    folded[row][col] = grid[row][(line - 1) - col]

    if axis == 'y':
        for n in range(line):
            row = ['0'] * cols
            folded.append(row)

        for row in range(line):
            for col in range(cols):
                folded[row][col] = grid[row][col]
                if folded[row][col] == '0':
                    folded[row][col] = grid[line * 2 - row][col]

    return folded



def solve(input, folds):
    rows = 0
    cols = 0
    grid = []

    rows, cols = find_size(input)

    # Create grid of zeros
    for n in range(rows):
        row = ['0'] * cols
        grid.append(row)

    # mark grid
    for coord in input:
        col, row = coord.split(',')
        grid[int(row)][int(col)] = '#'

    copy = []
    for row in range(len(grid)):
        new_row = []
        for col in range(len(grid[0])):
            new_row.append(grid[row][col])
        copy.append(new_row)

    for instruction in folds:
        copy = fold(copy, instruction[0], instruction[1])

    # print answer:
    for row in range(len(copy)):
        print(' '.join(copy[row]))
        # for col in range(len(copy[0])):
            # print

    # count dots
    count = 0
    for row in range(len(copy)):
        for col in range(len(copy[0])):
            if copy[row][col] == '#':
                count += 1

    return count

print(solve(dots, folds))
