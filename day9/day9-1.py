from pprint import pprint as pp

with open('input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[int(value) for value in row] for row in data]

def solve(input):
    left = False
    up = False
    right = False
    down = False

    sum = 0
    num_rows = len(input)
    num_cols = len(input[0])

    for row in range(num_rows):
        for col in range(num_cols):
            current = input[row][col]
            if row == 0:
                up = True
            else:
                up = input[row - 1 ][col] > current
            if row == num_rows - 1:
                down = True
            else:
                down = input[row + 1][col]  > current
            if col == 0:
                left = True
            else:
                left = input[row][col - 1] > current
            if col == num_cols - 1:
                right = True
            else:
                right = input[row][col + 1] > current

            if left and right and up and down:
                # print('row ', row, 'col ', col, 'val ', current)
                sum += current + 1

    return sum

print('answer', solve(transformed))
