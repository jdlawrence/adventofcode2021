import math

with open('input.txt') as f:
    data = f.read().strip().split('\n')

data = [list(line) for line in data]

# Unused in part 1 but used here!
def handle(char):
    if char == '(':
        return ')'
    elif char == '{':
        return '}'
    elif char == '<':
        return '>'
    elif char == '[':
        return ']'

def calc_score(list_chars):
    score = 0;
    for char in list_chars:
        score *= 5

        if char == ')':
            score += 1
        elif char == ']':
            score += 2
        elif char == '}':
            score += 3
        elif char == '>':
            score += 4

    return score

def fix_incomplete(stack):
    additional = []
    for char in list(reversed(stack)):
        if char != ' ':
            additional.append(handle(char))
    return additional

def get_middle(scores):
    sorted_scores = sorted(scores)
    return sorted_scores[math.trunc(len(scores) / 2)]

def solve(input):
    scores = []
    for line in data:
        stack = []
        error = False
        for char in line:
            if char == ')':
                if stack[-1] == '(':
                    stack.pop()
                else:
                    error = True
                    break
            elif char == '}':
                if stack[-1] == '{':
                    stack.pop()
                else:
                    error = True
                    break
            elif char == '>':
                if stack[-1] == '<':
                    stack.pop()
                else:
                    error = True
                    break
            elif char == ']':
                if stack[-1] == '[':
                    stack.pop()
                else:
                    error = True
                    break
            else:
                stack.append(char)
        if not error:
            scores.append(calc_score(fix_incomplete(stack)))
    return get_middle(scores)

print('answer', solve(data))
