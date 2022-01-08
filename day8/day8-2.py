from pprint import pprint as pp

data = open('sample-input.txt').read().strip().split('\n')

original = [1, 2, 3, 4]

doubled = list(map(lambda x: x + x, original))

for l in [{ "original": original }, { "doubled": doubled }]:
  pp(l)
