const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split('\n');

// create n x n size grid of empty dots
function createGrid(size) {
  const grid = [];
  let row = [];
  for (let i = 0; i < size; i++){
    row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        i,
        j,
        count: 0,
      });
    }
    grid.push(row);
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

  return {
    start,
    end,
  };
}

function markXChange(grid, start, end) {
  const y = start[1];
  if (start[0] < end[0]) {
    for (let i = start[0]; i <= end[0]; i++) {
      grid[i][y].count++;
    }
  } else {
    for (let i = start[0]; i >= end[0]; i--) {
      grid[i][y].count++;
    }
  }
}

function markYChange(grid, start, end) {
  const x = start[0];
  if (start[1] < end[1]) {
    for (let j = start[1]; j <= end[1]; j++) {
      grid[x][j].count++;
    }
  } else {
    for (let j = start[1]; j >= end[1]; j--) {
      grid[x][j].count++;
    }
  }
}

function markDiagChange(grid, start, end) {
  let x = start[0];
  let y = start[1];
  const numChanges = Math.abs(start[0] - end[0]);

  for (let i = 0; i <= numChanges; i++) {
    grid[x][y].count++;

    if (start[0] < end[0]) {
      x++;
    } else {
      x--;
    }

    if (start[1] < end[1]) {
      y++;
    } else {
      y--;
    }
  }
}

function markAll(grid, lines){
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].start[0] !== lines[i].end[0] && lines[i].start[1] !== lines[i].end[1]) {
      markDiagChange(grid, lines[i].start, lines[i].end);
    } else if (lines[i].start[0] !== lines[i].end[0]) {
      markXChange(grid, lines[i].start, lines[i].end);
    } else {
      markYChange(grid, lines[i].start, lines[i].end);
    }
  }
}

function countTwoOrMore(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j].count >= 2) {
        count++;
      }
    }
  }
  return count;
}

const lines = allData.map(transformInput);

// console.log(createGrid(3));
// console.log(transformInput('10, 0 -> 8, 0'));
const grid = createGrid(1000);
// const { start, end } = transformInput('1, 1 -> 5, 5');
// const { start, end } = transformInput('5, 1 -> 1, 5');
// markDiagChange(grid, start, end);
// const { start, end } = transformInput('1, 3 -> 1, 7');
// markYChange(grid, start, end);

markAll(grid, lines);
const total = countTwoOrMore(grid);
console.dir({ total });
