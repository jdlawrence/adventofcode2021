from pprint import pprint as pp

data = open('sample-input.txt').read().strip().split('\n')

transformed = [list(row) for row in data]
transformed = [[int(value) for value in row] for row in transformed]


print(data)
print(transformed[1][4])
print(transformed)

# def solve(input):


# print('answer', solve())
