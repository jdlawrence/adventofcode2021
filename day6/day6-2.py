NOTE: This solution was provided by Thomas Loock, on twitter @@Brotherluii
https://twitter.com/Brotherluii/status/1467870221834887172/photo/1

state = {i:0 for i in range(9)}

for num in open('sample-input.txt').read().strip().split(','):
    state[int(num)] += 1


for _ in range(256):
    state_zero = state[0]
    for i in range(8):
        state[i] = state[i+1]
    state[6] += state_zero
    state[8] = state_zero

print(sum(state.values()))