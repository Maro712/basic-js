const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  const CONTROLS = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];
  if (!(arr instanceof Array)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  } else if (arr.length === 0) {
    return arr;
  } else if (!arr.includes(CONTROLS[0]) && !arr.includes(CONTROLS[1]) && !arr.includes(CONTROLS[2]) && !arr.includes(CONTROLS[3])) {
    return arr;
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    if (!CONTROLS.includes(elem)) {
      result.push(elem);
    } else if (elem === CONTROLS[0] && i < arr.length - 1) {
      i = i + 2;
    } else if (elem === CONTROLS[1] && i > 0) {
      result.pop();
    } else if (elem === CONTROLS[2] && i < arr.length - 1) {
      result.push(arr[i + 1]);
    } else if (elem === CONTROLS[3] && i > 0) {
      result.push(result[result.length - 1]);
    }
  }
  return result;
}

module.exports = {
  transform
};
