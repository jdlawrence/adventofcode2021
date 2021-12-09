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

const checkRows = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (checkRow(board[i])) {
      return true;
    }
  }
  return false;
};

const checkCol = (board, col) => {
  let result = true;
  for (let row = 0; row < board.length; row++) {
    result = result && board[row][col].marked;
  }
  return result;
};

const checkCols = (board) => {
  for (let col = 0; col < board.length; col++) {
    if (checkCol(board, col)) {
      return true;
    }
  }
  return false;
};

// Top left to bottom right diagonal
const checkMainDiagonal = (board) => {
 const numRows = board.length;
  let result = true;
  for (let i = 0; i < numRows; i++) {
    console.log('i: ', i,board[i][i].marked);
    result = result && board[i][i].marked;
  }
  return result;
};

// Top right to bottom right diagonal
const checkAltDiagonal = (board) => {
  const numRows = board.length;
  let result = true;
  for (let i = 0; i < numRows; i++) {
    console.log('i: ', i, 'numRows - i - 1', numRows - i -1, 'marked', board[numRows - i - 1][i].marked);
    result = result && board[i][numRows - i - 1].marked;
  }
  return result;
}

/* Quick tests */
// console.log(boards[1]);
// console.log(transformedBoards[1]);
// markBoard(transformedBoards[1], '3');
// markBoard(transformedBoards[1], '145');
// console.log(transformedBoards[1]);

// console.log('check: ', checkRow([
//   { val: '19', marked: false },
//   { val: '8', marked: true },
//   { val: '7', marked: true },
//   { val: '25', marked: true },
//   { val: '23', marked: true }
// ]));
console.log('****', checkAltDiagonal([
  [
    { val: '3', marked: false },
    { val: '15', marked: false },
    { val: '0', marked: false },
    { val: '2', marked: false },
    { val: '22', marked: true }
  ],
  [
    { val: '9', marked: false },
    { val: '18', marked: false },
    { val: '13', marked: false },
    { val: '17', marked: true },
    { val: '5', marked: false }
  ],
  [
    { val: '19', marked: false },
    { val: '8', marked: false },
    { val: '7', marked: true },
    { val: '25', marked: false },
    { val: '23', marked: false }
  ],
  [
    { val: '20', marked: false },
    { val: '11', marked: true },
    { val: '10', marked: false },
    { val: '24', marked: false },
    { val: '4', marked: false }
  ],
  [
    { val: '14', marked: true },
    { val: '21', marked: false },
    { val: '16', marked: false },
    { val: '12', marked: false },
    { val: '6', marked: false }
  ]
]));



