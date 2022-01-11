from pprint import pprint as pp

data = open('input.txt').read().strip().split('\n')

def sortString(input):
  return ''.join(sorted(input))

transformed = list(map(lambda x:
    list(map(lambda y: sortString(y), x.split(' '))), data))

transformed2 = list(map(lambda x: ' '.join(x), transformed))


def solve():
    inputs = [line.split('|')[0].strip().split(' ') for line in transformed2]
    outputs = [line.split('|')[1].strip().split(' ') for line in transformed2]

    total = 0;

    for i in range(len(data)):
        digitMap = {};

        # Unique lengths
        for input in inputs[i]:
            if (len(input) == 2):
                digitMap[1] = input
            elif (len(input) == 3):
                digitMap[7] = input
            elif (len(input) == 4):
                digitMap[4] = input
            elif (len(input) == 7):
                digitMap[8] = input

        # Inputs with length 6
        for input in inputs[i]:
            if (len(input) == 6):
                if (set(digitMap[4]).issubset(set(input))):
                    digitMap[9] = input
                elif(set(digitMap[1]).issubset(set(input))):
                    digitMap[0] = input
                else:
                    digitMap[6] = input
        # Inputs with length 5
        for input in inputs[i]:
            if (len(input) == 5):
                if (set(digitMap[1]).issubset(set(input))):
                    digitMap[3] = input
                elif (set(input).issubset(set(digitMap[6]))):
                    digitMap[5] = input
                else:
                    digitMap[2] = input

        reverseMap = {}
        for key, value in digitMap.items():
            reverseMap[value] = key

        stringOutput = ''
        for code in outputs[i]:
           stringOutput += str(reverseMap[code])
        total += int(stringOutput)

    return total

print('answer', solve())
