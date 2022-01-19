with open('input.txt') as f:
    data = f.read().strip().split('\n')

print(data)


print('answer', solve(transformed))
