from pprint import pprint as pp

data = open('sample-input.txt').read().strip().split('\n')

def sortString(input):
  return ''.join(sorted(input))

transformed = list(map(lambda x:
    list(map(lambda y: sortString(y), x.split(' '))), data))

transformed2 = list(map(lambda x: ' '.join(x), transformed))


def solve():
    inputs = [line.split('|')[0].strip().split(' ') for line in transformed2]
    outputs = [line.split('|')[1].strip().split(' ') for line in transformed2]

    total = 0;

    jamil = 'abc'
    akeem = 'abcd'
    print(set(jamil).issubset(set(akeem)))
    print(set(akeem).issubset(set(jamil)))
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
                if (set(input).issubset(digitMap[6])):
                    digitMap[5] = input
                else:
                    digitMap[2] = input
        print(digitMap)

    # for i in range(len(data)):



solve()
