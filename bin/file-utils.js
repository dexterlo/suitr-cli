import { readFileSync } from 'fs';

export const fileToArray = function(filePath) {
  var array = readFileSync(filePath).toString().split("\n");
  return array.filter(function (el) {
    return el && el.length;
  });
}

export default { fileToArray };