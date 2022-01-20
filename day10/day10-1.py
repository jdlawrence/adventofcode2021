with open('input.txt') as f:
    data = f.read().strip().split('\n')

data = [list(line) for line in data]

# May be used in part 2?
def handle(char):
    if char == '(':
        return ')'
    elif char == '{':
        return '}'
    elif char == '<':
        return '>'
    elif char == '[':
        return ']'

def calc_score(char):
    if char == ')':
        return 3
    elif char == ']':
        return 57
    elif char == '}':
        return 1197
    elif char == '>':
        return 25137

def solve(input):
    score = 0;
    for line in data:
        stack = []
        for char in line:
            if char == ')':
                if stack[-1] == '(':
                    stack.pop()
                else:
                    score += calc_score(char)
                    break
            elif char == '}':
                if stack[-1] == '{':
                    stack.pop()
                else:
                    score += calc_score(char)
                    break
            elif char == '>':
                if stack[-1] == '<':
                    stack.pop()
                else:
                    score += calc_score(char)
                    break
            elif char == ']':
                if stack[-1] == '[':
                    stack.pop()
                else:
                    score += calc_score(char)
                    break
            else:
                stack.append(char)
    return score

print('answer', solve(data))
