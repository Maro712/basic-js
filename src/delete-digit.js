const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let min = 0;

  const nStr = n.toString();
  console.log(nStr);
  for(let i = 0; i < nStr.length; i++) {
    const nArr = nStr.split('');
    nArr.splice(i, 1);
    currentNum = +nArr.join('');
    if (currentNum > min) {
      min = currentNum;
    }
  }
  return min;
}

module.exports = {
  deleteDigit
};
