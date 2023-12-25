const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
const ALPHABET_LENGTH = 26

class VigenereCipheringMachine {
  constructor(direction = true) {
    this.direct = direction
  }

  encrypt(text, key) {
    return this.executeVigenere(text, key, 'encrypt')
  }

  decrypt(text, key) {
    return this.executeVigenere(text, key, 'decrypt')
  }

  executeVigenere(text, key, mode) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!')
    }

    const isEncryptMode = mode === 'encrypt'
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    let keyIndex = 0

    key = key.toUpperCase()
    text = text.toUpperCase()

    for (let i = 0; i < text.length; i++) {
      if (alphabet.includes(text[i])) {
        const textCharCode = text.charCodeAt(i) - 'A'.charCodeAt(0)
        const keyCharCode = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0)
        keyIndex++

        let shiftedCharCode

        isEncryptMode
          ? shiftedCharCode = (textCharCode + keyCharCode) % ALPHABET_LENGTH
          : shiftedCharCode = (textCharCode - keyCharCode + ALPHABET_LENGTH) % ALPHABET_LENGTH

        result += String.fromCharCode(shiftedCharCode + 'A'.charCodeAt(0))
      } else {
        result += text[i]
      }
    }

    return this.direct
      ? result
      : result.split('').reverse().join('')
  }
}

module.exports = {
  VigenereCipheringMachine
};
