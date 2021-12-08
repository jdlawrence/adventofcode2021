const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split('\n\n');

const drawNumbers = allData[0];

const formatBoard = (board) => board
.split('\n')
.map(row => row.trim().split(/[\s,\s\s]+/));

const boards = allData.slice(1).map(formatBoard);

// console.log('board', formatBoard(boards[0]));
// console.dir({ boards });

// Transform boards so that we can tell which values are marked
const transformedBoards = boards
.map(board => board
  .map(row => row
    .map(val => ({ val, marked: false}))));

const markBoard = (board, numberCalled) => {
  board.forEach(row => {
    row.forEach(entry => {
      if (entry.val === numberCalled) {
        entry.marked = true;
      }
    });
  });
};

const checkRow = (row) => {
  let result = true;
  for (let i = 0; i < row.length; i++) {
    result = result && row[i].marked === true;
  }
  return result;
};

console.log(boards[1]);
console.log(transformedBoards[1]);
markBoard(transformedBoards[1], '3');
markBoard(transformedBoards[1], '145');
console.log(transformedBoards[1]);

console.log('check: ', checkRow(  [
  { val: '19', marked: false },
  { val: '8', marked: true },
  { val: '7', marked: true },
  { val: '25', marked: true },
  { val: '23', marked: true }
]));

