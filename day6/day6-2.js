// const fs = require('fs');
// const {join} = require('path');

// const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// // const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

// const allData = file.split(',').map(Number);

// const calc = (numDays, input) => {
//   // Fill an array 9 items (zero through eight) with zeros
//   const totals = [];
//   for (let i = 0; i < 9; i++) {
//     totals.push(0);
//   }

//   // Counts the number of fish at each day
//   for (let i = 0; i < input.length; i++) {
//     totals[allData[i]]++;
//   }

//   // Carry out the process for however many days the problem asks
//   for (let i = 0; i < numDays; i++) {
//     // Each day, count the number of zero days
//     const zeroDays = totals[0];
//     // Shift the counts for each day by 1, ie the number of threes today is the number
//     // of fours.
//     for (let j = 0; j < 8; j++) {
//       totals[j] = totals[j+1];
//     }
//     // The former zeros are added to the sixes
//     totals[6] += zeroDays;
//     // Also for a every zero, create an eight
//     totals[8] = zeroDays;
//   }

//   return totals.reduce((total, next) => total + next);
// };

// console.dir({ calc: calc(256, allData) });
const fs = require('fs');

function main() {
	const days = 256;
	const counts = Array(9).fill(0);

	fs.readFileSync('./input.txt')
		.toString()
		.split(',')
		.map(n => parseInt(n, 10))
		.forEach(n => counts[n] += 1);

	for (let i = 0; i < days; i++) {
		const newCount = counts.shift();
		counts[6] += newCount;
		counts.push(newCount);
	}

	console.log('total:', counts.reduce((count, total) => count + total));
}

main();