const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split(',').map(Number);

const calc = (input, numDays) => {
  const result = [...input];

  for (let i = 0; i < numDays; i++) {
    let countNew = 0;

    for (let j = 0; j < result.length; j++) {
      if (result[j] > 0) {
        result[j]--;
      } else if (result[j] === 0) {
        result[j] = 6;
        countNew++;
      }
    }

    for (let k = 0; k < countNew; k++) {
      result.push(8);
    }
  }
  return result;
};

console.log(calc([3, 4, 3, 1, 2], 256).length);
console.log(calc(allData, 80).length);
