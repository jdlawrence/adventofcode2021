const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split('\n').map(item => item.split(' | ')[1]);

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

console.dir({ allData });
console.dir({ result: countUnique(allData) });
