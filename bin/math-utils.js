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

export default {
  getCombinations,
};