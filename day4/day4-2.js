const fs = require('fs');
const {join} = require('path');

// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');
const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');

const allData = file.split('\n\n');

const drawNumbers = allData[0].split(',');

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
    result = result && board[i][i].marked;
  }
  return result;
};

// Top right to bottom right diagonal
const checkAltDiagonal = (board) => {
  const numRows = board.length;
  let result = true;
  for (let i = 0; i < numRows; i++) {
    result = result && board[i][numRows - i - 1].marked;
  }
  return result;
};

const checkForWin = (board) => {
  return checkRows(board) || checkCols(board);
  //|| checkMainDiagonal(board) || checkAltDiagonal(board);
};

const getUnmarkedSum = (board) => {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].marked === false) {
        sum += Number(board[i][j].val);
      }
    }
  }
  return sum;
};
const calcFinalValue = (board, valAsString) => {
  return getUnmarkedSum(board) * Number(valAsString);
};


// console.log('!#$@$', calcFinalValue([
//   [
//     { val: '14', marked: true },
//     { val: '21', marked: true },
//     { val: '17', marked: true },
//     { val: '24', marked: true },
//     { val: '4', marked: true }
//   ],
//   [
//     { val: '10', marked: false },
//     { val: '16', marked: false },
//     { val: '15', marked: false },
//     { val: '9', marked: true },
//     { val: '19', marked: false }
//   ],
//   [
//     { val: '18', marked: false },
//     { val: '8', marked: false },
//     { val: '23', marked: true },
//     { val: '26', marked: false },
//     { val: '20', marked: false }
//   ],
//   [
//     { val: '22', marked: false },
//     { val: '11', marked: true },
//     { val: '13', marked: false },
//     { val: '6', marked: false },
//     { val: '5', marked: true }
//   ],
//   [
//     { val: '2', marked: true },
//     { val: '0', marked: true },
//     { val: '12', marked: false },
//     { val: '3', marked: false },
//     { val: '7', marked: true }
//   ]
// ], '24'));

const createWinnerTracker = (boards) => {
  return boards.map(board => ({ board, winner: false }));
};

/* Main function */
const playGame = (nums, boards) => {
  const numOfBoards = boards.length;
  let numOfWinners = 0;
  let boardsWithWinners = createWinnerTracker(boards);

  for (let i = 0; i < nums.length; i++) {
    // Go through the array of boards and mark the val
    for (let j = 0; j < boardsWithWinners.length; j++) {
      // If we've already marked this board as a winner, move on
      if (boardsWithWinners[j].winner) {
        continue;
      }
      else {
        markBoard(boardsWithWinners[j].board, nums[i]);
        if (checkForWin(boardsWithWinners[j].board)) {
          numOfWinners++;
          boardsWithWinners[j].winner = true;
          if (numOfWinners === numOfBoards) {
            return calcFinalValue(boardsWithWinners[j].board, nums[i]);
          }
        }
      }
    }
  }
};

console.log('main', playGame(drawNumbers, transformedBoards));
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

// console.log('****', checkAltDiagonal([
//   [
//     { val: '3', marked: false },
//     { val: '15', marked: false },
//     { val: '0', marked: false },
//     { val: '2', marked: false },
//     { val: '22', marked: true }
//   ],
//   [
//     { val: '9', marked: false },
//     { val: '18', marked: false },
//     { val: '13', marked: false },
//     { val: '17', marked: true },
//     { val: '5', marked: false }
//   ],
//   [
//     { val: '19', marked: false },
//     { val: '8', marked: false },
//     { val: '7', marked: true },
//     { val: '25', marked: false },
//     { val: '23', marked: false }
//   ],
//   [
//     { val: '20', marked: false },
//     { val: '11', marked: true },
//     { val: '10', marked: false },
//     { val: '24', marked: false },
//     { val: '4', marked: false }
//   ],
//   [
//     { val: '14', marked: false },
//     { val: '21', marked: false },
//     { val: '16', marked: false },
//     { val: '12', marked: false },
//     { val: '6', marked: false }
//   ]
// ]));



