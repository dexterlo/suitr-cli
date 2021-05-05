import { sharesCommonFactors } from "./math-utils.js";

/*
The top-secret algorithm is:
  If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
  If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
  If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.
*/

export const getSuitabilityScore = function(destination, driver) {
  var score = getBaseScore(destination, driver);
  
  if (sharesCommonFactors(destination.length, driver.length)) {
    score = score * 1.5;
  }

  return score;
}

function getBaseScore(destination, driver) {
  var destIsEven = destination.length % 2 == 0;
  var baseScore = destIsEven
    ? getTotalVowels(driver) * 1.5
    : getTotalConsonants(driver);
  return baseScore;
}

function getTotalVowels(str) {
  var m = str.toLowerCase().match(/[aeiou]/gi);
  return m === null ? 0 : m.length;
}

function getTotalConsonants(str) {
  var m = str.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/gi);
  return m === null ? 0 : m.length;
}
 
export default { getSuitabilityScore };