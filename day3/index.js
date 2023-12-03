const fs = require('fs');

function isNotPeriod(str) {
  return str !== '.' && isNaN(str);
}

fs.readFile('./data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const arr = data.split('\r\n');

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    console.log('---');
    const currentLine = arr[i];
    const prevLine = arr[i - 1] || null;
    const nextLine = arr[i + 1] || null;

    console.log(prevLine);
    console.log(currentLine);
    console.log(nextLine);

    const numbers = currentLine.match(/\d+/g);

    if (numbers)
      for (const num of numbers) {
        // check if something exists before and after
        const index = currentLine.indexOf(num);

        const prevIndex = index - 1;
        const nextIndex = index + num.length;

        if (
          isNotPeriod(currentLine[prevIndex]) ||
          isNotPeriod(currentLine[nextIndex])
        ) {
          console.log(`Add value ${Number(num)}, matching same line`);
          sum += Number(num);
          continue;
        }

        for (let j = prevIndex; j <= nextIndex; j++) {
          if (
            (prevLine !== null && isNotPeriod(prevLine[j])) ||
            (nextLine !== null && isNotPeriod(nextLine[j]))
          ) {
            console.log(`Add value ${Number(num)}`);
            sum += Number(num);
          }
        }
      }

    console.log(`Sum of number is ${sum}`);
  }
});
