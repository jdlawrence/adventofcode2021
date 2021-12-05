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
console.log(boards[1]);


