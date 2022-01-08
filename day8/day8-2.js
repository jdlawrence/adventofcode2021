const { sign } = require('crypto');
const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split('\n').map(item => item.split(' | ')[1]);

// Used by Set
function symmetricDifference(setA, setB) {
  let _difference = new Set(setA);
  for (let elem of setB) {
      if (_difference.has(elem)) {
          _difference.delete(elem);
      } else {
          _difference.add(elem);
      }
  }
  return _difference;
}

const countUnique = (items) => {
  let count = 0;
  items.forEach(item => {
    const subitems = item.split(' ');
    // console.dir({ subitems });
    subitems.forEach(subitem => {
      // console.dir({ subitem, length: subitem.length });
      if (subitem.length === 2 ||
        subitem.length === 3 ||
        subitem.length === 4 ||
        subitem.length === 7
      ) {
        count++;
      }
    });
  });

  return count;
};

const isSubset = (subString, mainString) => {
  return subString.split('').every(char => mainString.indexOf(char) >= 0);
};

// let test = 'ab';

let testSignalMap = [];

// signalMap[test.length] = test;

let dummy = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' ');

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

const reverseMap = makeReverseMap(testSignalMap);

const decodeFinal = (inputs, reverseMap) => {
  let result = '';
  const sortedInputs = inputs.map(input => input.split('').sort().join(''));
  sortedInputs.forEach(input => {
    console.log('adf', input, reverseMap[input]);
    result += reverseMap[input];
  });
  return parseInt(result);
};

const equalSets = (val1, val2) => {
  const set1 = new Set(val1.split(''));
  const set2 = new Set(val2.split(''));
  return symmetricDifference(set1, set2).size === 0;
};

// console.dir({ set: equalSets('abcdefg', 'gfedcba') });

let testCode = 'cdfeb fcadb cdfeb cdbaf'.split(' ');

findUnique(dummy, testSignalMap);
findLength6(dummy, testSignalMap);
findLength5(dummy, testSignalMap);
const sortedTestSignalMap = testSignalMap.map(signal => signal.split('').sort().join(''));
let testReverseMap = makeReverseMap(sortedTestSignalMap);

console.dir({ sortedTestSignalMap });
console.dir({ testReverseMap });
console.dir({ final: decodeFinal(testCode, testReverseMap)  });


// console.dir({ allData: isSubset('jamil', 'jamila') });
// console.dir({ allData: isSubset('jamilxxx', 'jamila') });
