const fs = require('fs');

/**
 * The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
 */


/**
 * --- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
 */


/**
 * This enum is weird because The right calibration values for string "eighthree" is 83 and for "sevenine" is 79.The examples do not cover such cases.
 * Doing this prevents conflict overlapping.
 */
const numberEnum = {
  one: 'one1one',
  two: 'two2two',
  three: 'three3three',
  four: 'four4four',
  five: 'five5five',
  six: 'six6six',
  seven: 'seven7seven',
  eight: 'eight8eight',
  nine: 'nine9nine',
};

function replaceNumbers(text) {
  for (const key in numberEnum) {
    if (text.includes(key)) {
      text = text.replaceAll(new RegExp(key, 'g'), numberEnum[key]);
    }
  }

  return text;
}

fs.readFile('./data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const arr = data.split('\r\n');

  let sum = 0;
  for (const line of arr) {
    const digitsConverted = replaceNumbers(line);

    // Removes any non number inside text
    const sanitizedNumber = digitsConverted.match(/\d/g).join('');

    const lastIndex = sanitizedNumber.toString().length - 1;

    const valueToAdd =
      sanitizedNumber.toString()[0] + sanitizedNumber.toString()[lastIndex];

    sum += Number(valueToAdd);

    console.log(line, '===> ', sanitizedNumber, ' =>', valueToAdd);
  }
  console.log('Sum of data is: ', sum);
});
