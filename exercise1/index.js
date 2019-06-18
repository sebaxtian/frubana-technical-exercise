const readline = require("readline");

// Operations number
var n = 0;
// List operations
var operations = [];

// Readline Interface STDIn STDOut
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read input user
rl.question("The number of operations: ", async answer => {
  n = answer;
  let i = 1;
  while (i <= n) {
    let op = await new Promise((resolve, reject) => {
      rl.question("Operation " + i + ": ", answer => {
        resolve(answer);
      });
    });
    operations.push(op);
    i++;
  }
  // Print input user
  console.log("\nInput");
  console.log(n);
  for (let i = 0; i < operations.length; i++) {
    console.log(operations[i]);
  }
  console.log("");
  rl.close();
  // Call main function
  main();
});

/**
 * n: That indicates the number of operations
 * oprs: List operations, either a x or r x.
 *       a x indicates that x is added to the set,
 *       and r x indicates that x is removed from the set.
 * 
 * @param {number} n
 * @param {array} oprs
 * @returns {array} solution
 */
function solveProblem(n, oprs) {
  let solution = [];

  // Numbers list
  let numbers = [];

  // Execute operations
  for (let i = 0; i < n; i++) {
    // Median I
    let medianI = 0;
    // Operation I
    const opI = oprs[i].split(' ');
    // Validate operation
    if (opI[0] === 'a') {
      // Add operation
      numbers.push(parseInt(opI[1], 10));
      numbers = mergeSort(numbers);
      medianI = calculateMedian(numbers);
    } else if (opI[0] === 'r') {
      // Remove operation
      const isN = numbers.indexOf(parseInt(opI[1], 10));
      if (isN != -1) {
        numbers.splice(isN, 1);
        // Only when the are numbers
        if (numbers.length > 0) {
          medianI = calculateMedian(numbers);
        } else {
          medianI = 'Wrong!';
        }
      } else {
        medianI = 'Wrong!';
      }
    } else {
      // Invalid operation
      medianI = 'Wrong!';
    }
    // Push de solutionI median
    solution.push(medianI);
  }
  // Return solution
  return solution;
}


/**
 * Calculate the median for a list numbers
 * 
 * @param {array} numbers 
 */
function calculateMedian(numbers) {
  // Validate numbers list length, odd or even
  if (numbers.length % 2 === 0) {
    // Even length
    const half = Math.floor(numbers.length / 2);
    const first = numbers[half - 1];
    const second = numbers[half];
    return (first + second) / 2;
  } else {
    // Odd length
    return numbers[Math.floor(numbers.length / 2)];
  }
}


/**
 * oprs: List operations, either a x or r x.
 *       a x indicates that x is added to the set,
 *       and r x indicates that x is removed from the set.
 * 
 * @param {array} oprs 
 */
function getNumbers(oprs) {
  let numbers = [];
  for (let i = 0; i < oprs.length; i++) {
    const n = parseInt(oprs[i].split(' ')[1], 10);
    numbers.push(n);
  }
  return numbers;
}


/**
 * numbers: numbers list for sort from least to greatest
 * 
 * @param {array} numbers 
 * @returns {array} orderList
 */
function mergeSort(numbers) {
  // 1. If the list has only one element, return the list and terminate. (Base case)
  if (numbers.length <= 1) {
    return numbers;
  }
  // 2. Split the list into two halves that are as equal in length as possible. (Divide)
  const half = Math.floor(numbers.length / 2);
  let leftList = numbers.slice(0, half);
  let rightList = numbers.slice(half);

  // 3. Using recursion, sort both lists using mergesort. (Conquer)
  leftList = mergeSort(leftList);
  rightList = mergeSort(rightList);

  // 4. Merge the two sorted lists and return the result. (Combine)
  sortedList = merge(leftList, rightList);

  // Return sorted list
  return sortedList;
}

/**
 * Merge two arrays Order from least to greatest
 * 
 * @param {array} leftList 
 * @param {array} rightList 
 */
function merge(leftList, rightList) {
  // 4. Merge the two sorted lists and return the result. (Combine)
  let resultList = [];
  // Index left and right
  let leftI = 0;
  let rightI = 0;
  // Order from least to greatest
  while (leftI < leftList.length && rightI < rightList.length) {
    if (leftList[leftI] < rightList[rightI]) {
      resultList.push(leftList[leftI]);
      leftI++;
    } else {
      resultList.push(rightList[rightI]);
      rightI++;
    }
  }
  // Add the last element
  resultList = resultList.concat(leftList.slice(leftI)).concat(rightList.slice(rightI));
  // Return sorted list
  return resultList;
}



/**
 * Main Function
 */
function main() {
  let response = solveProblem(n, operations);
  // Print output
  console.log("\nOutput");
  for (let i = 0; i < response.length; i++) {
    console.log(response[i]);
  }
  console.log("");
}


module.exports = solveProblem;
