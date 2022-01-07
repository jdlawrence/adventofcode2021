const fs = require('fs');
const {join} = require('path');
const { addAbortSignal } = require('stream');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = fs.readFileSync(join(__dirname, './sample-input.txt'), 'utf8');

const allData = file.split(',').map(Number);

const calcSumToN = (n) => {
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result.push(result[i - 1] + i);
  }

  return result;
};

const sumReference = calcSumToN(2000);

const calcFuelCost = (inputs, position) => {
  let cost = 0;
  inputs.forEach(input => {
    cost += sumReference[Math.abs(input - position)];
  });
  return cost;
};

const findMinimumCost = (inputs) => {
  let minimum = Number.POSITIVE_INFINITY;
  let maxPosition = Math.max(...inputs);

  for (let i = 0; i <= maxPosition; i++) {
    const cost = calcFuelCost(inputs, i);
    if (cost < minimum) {
      minimum = cost;
    }
  }
  return minimum;
};

const cost = calcFuelCost(allData, 3);

const min = findMinimumCost(allData);

console.dir({ j: sumReference[1000], cost, min });

