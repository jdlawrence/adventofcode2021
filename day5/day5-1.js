const fs = require('fs');
const {join} = require('path');

// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');
const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split('\n');

// console.log({ allData });

// create n x n size grid of empty dots
function createGrid(size) {
  const grid = [];
  for (let i = 0; i <= size; i++){
    for (let j = 0; j <= size; j++) {
      grid.push({
        i,
        j,
        count: 0,
      });
    }
  }

  return grid;
}

// takes in a string like '126,770 -> 732,164' and outputs an object like:
// {
//   start: [125, 770],
//   end: [732, 164],
// }
function transformInput(inputStr) {
  const firstSplit = inputStr.split(' -> ');
  const startSplit = firstSplit[0].split(',');
  const start = [Number(startSplit[0]), Number(startSplit[1])];
  const endSplit = firstSplit[1].split(',');
  const end = [Number(endSplit[0]), Number(endSplit[1])];

  console.dir({ start, end });
}

// console.log(createGrid(3));
console.log(transformInput('126,770 -> 732,164'));
