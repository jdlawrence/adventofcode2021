const { sign } = require('crypto');
const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file
  .split('\n')
  .map(line => line.split(' ')
                   .map(item => item.split('').sort().join(''))
                   .join(' '))
  .map(line => line.split(' | '))
  .map(item => item.map(code => code.split(' ')));

const isSubset = (subString, mainString) => {
  return subString.split('').every(char => mainString.indexOf(char) >= 0);
};

const findUnique = (inputs, signalMap) => {
  inputs.forEach(input => {
    if (input.length === 2) {
      signalMap[1] = input;
    } else if (input.length === 3) {
      signalMap[7] = input;
    } else if (input.length === 4) {
      signalMap[4] = input;
    } else if (input.length === 7) {
      signalMap[8] = input;
    }
  });

  return signalMap;
};

const findLength6 = (inputs, signalMap) => {
  inputs.forEach(input => {
    if (input.length === 6) {
      if (isSubset(signalMap[4], input)) {
        signalMap[9] = input;
      } else if (isSubset(signalMap[1], input)) {
        signalMap[0] = input;
      } else {
        signalMap[6] = input;
      }
    }
  });
};

const findLength5 = (inputs, signalMap) => {
  inputs.forEach(input => {
    if (input.length === 5) {
      if (isSubset(signalMap[1], input)) {
        signalMap[3] = input;
      } else if (isSubset(input, signalMap[6])) {
        signalMap[5] = input;
      } else {
        signalMap[2] = input;
      }
    }
  });
};

const makeReverseMap = (signalMap) => {
  let result = {};
  signalMap.forEach((code, index) => {
    result[code] = index.toString(10);
  });
  return result;
};

const decodeFinal = (inputs, reverseMap) => {
  let result = '';
  inputs.forEach(input => {
    result += reverseMap[input];
  });
  return parseInt(result);
};

const main = (data) => {
  let total = 0;
  data.forEach(line => {
    let signalMap = [];
    const [inputs, outputs] = line;
    findUnique(inputs, signalMap);
    findLength6(inputs, signalMap);
    findLength5(inputs, signalMap);
    let reverseMap = makeReverseMap(signalMap);
    total += decodeFinal(outputs, reverseMap);
  });
  return total;
};

console.dir({ main: main(allData) });