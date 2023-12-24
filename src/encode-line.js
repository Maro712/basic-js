const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  return str
    .split('')
    .reduce((encoded, char, index, arr) => {

      if (char === arr[index + 1]) {
        encoded.count++
      } else {
        encoded.result += (encoded.count > 1 ? encoded.count : '') + char
        encoded.count = 1
      }

      return encoded
    }, {result: '', count: 1}).result
}

module.exports = {
  encodeLine
};
