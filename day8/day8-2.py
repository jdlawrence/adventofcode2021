from pprint import pprint as pp

data = open('sample-input.txt').read().strip().split('\n')

def sortString(input):
  return ''.join(sorted(input))

pp(sortString('Jamil'))

transformed = list(map(lambda x:
  list(map(lambda y: sortString(y), x.split(' '))), data))

transformed2 = list(map(lambda x: ' '.join(x), transformed))

inputs = [line.split('|')[0].strip() for line in transformed2]
outputs = [line.split('|')[1].strip() for line in transformed2]

pp(inputs)
pp(outputs)

original = [1, 2, 3, 4]

doubled = list(map(lambda x: x + x, original))

for l in [{ "original": original }, { "doubled": doubled }]:
  pp(l)
