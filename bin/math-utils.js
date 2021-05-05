// Generate a 2D array of combos, given lengths of each dimension
export const getCombinations = function (dimension1length, dimension2length) {
  let combos = [];
  for (let i = 0; i < dimension1length; i++) {
    for (let j = 0; j < dimension2length; j++) {
      combos.push([i, j]);
    }
  }
  return combos;
}


// Given 2 arrays, check equality
// (https://www.30secondsofcode.org/blog/s/javascript-array-comparison)
export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const uniqueValues = new Set([...arr1, ...arr2]);
  for (const v of uniqueValues) {
    const arr1Count = arr1.filter(e => e === v).length;
    const arr2Count = arr2.filter(e => e === v).length;
    if (arr1Count !== arr2Count) return false;
  }
  return true;
}

// Checks if 2 numbers share any common multiplication factors (other than 1)
export const sharesCommonFactors = function (num1, num2) {
  let factors1 = getAllFactors(num1).slice(1);
  let factors2 = getAllFactors(num2).slice(1);
  let intersection = factors1.filter(n => factors2.includes(n));
  return intersection.length > 0;
}

// Returns all multiplication factors for a given integer
export const getAllFactors = function (num) {
  let factors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      factors.push(i);
    }
  }
  return factors;
}

export default {
  getCombinations,
  arraysAreEqual,
  sharesCommonFactors,
  getAllFactors
};
