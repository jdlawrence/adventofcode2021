from pprint import pprint as pp

with open('input.txt') as f:
    data = f.read().strip().split('\n')

transformed = [[{ 'val': int(value), 'visited': False } for value in row] for row in data]
# Add in visited flag

def solve(input):
    sum = 0
    num_rows = len(input)
    num_cols = len(input[0])

    def find_basin(row, col, grid):
        current = grid[row][col]
        if current['val'] == 9:
            return 0
        else:
            size = 1
        current['visited'] = True

        # left
        if row >= 1 and grid[row - 1][col]['visited'] == False :
            size += find_basin(row - 1, col, grid)
            # find_basin(row - 1, col, grid, size + 1)
        # up
        if col >= 1 and grid[row][col - 1]['visited'] == False:
            size += find_basin(row, col - 1, grid)
            # find_basin(row, col - 1, grid, size + 1)
        # right
        if row < num_rows - 1 and grid[row + 1][col]['visited'] == False:
            size += find_basin(row + 1, col, grid)
            # find_basin(row + 1, col, grid, size + 1)
        # down
        if col < num_cols - 1 and grid[row][col + 1]['visited'] == False:
            size += find_basin(row, col + 1, grid)
            # find_basin(row, col + 1, grid, size + 1)

        if current['val'] != 9 and current['visited'] == False:
            print(current['val'])

        return size;

    def largest_three(tracker, val):
        if val > tracker[0]:
           return [val, tracker[0], tracker[1]]
        elif val > tracker[1]:
            return [tracker[0], val, tracker[1]]
        elif val > tracker[2]:
            return [tracker[0], tracker[1], val]
        else:
            return tracker

    tracker = [0, 0, 0]

    for row in range(num_rows):
        for col in range(num_cols):
            tracker = largest_three(tracker, find_basin(row, col, input))

    print(tracker)
    return tracker[0] * tracker[1] * tracker[2]

print('answer', solve(transformed))
