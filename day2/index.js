const fs = require('fs');

const RED_TARGET = 12;
const GREEN_TARGET = 13;
const BLUE_TARGET = 14;

fs.readFile('./data.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const arr = data.split('\r\n');

  let gameIDs = [];
  let gameIDSummed = 0;

  let redSum = [];
  let greenSum = [];
  let blueSum = [];

  for (const list of arr) {
    const [game, sets] = list.split(':');
    const gameId = Number(game.match(/\d/g).join(''));

    const setsArray = sets.split(';');
    for (const subset of setsArray) {
      const subsetValue = subset.split(',');
      // console.log(subsetValue);
      let reset = false;

      for (const value of subsetValue) {
        let numberOfCubes = Number(value.match(/\d/g).join(''));
        if (value.includes('red')) {
          if (numberOfCubes > RED_TARGET) {
            reset = true;
          } else {
          }
        }

        if (value.includes('green')) {
          if (numberOfCubes > GREEN_TARGET) {
            reset = true;
          }
        }

        if (value.includes('blue')) {
          if (numberOfCubes > BLUE_TARGET) {
            reset = true;
          }
        }

        if (
          redSum > RED_TARGET &&
          greenSum > GREEN_TARGET &&
          blueSum > BLUE_TARGET
        ) {
          reset = true;
        } else {
          // gameIDs.push(...tempIDs);
        }
      }

      if (!reset) {
        gameIDSummed += gameId;
      }

      // console.log(
      //   `red total ${redSum}, blue total ${blueSum}, green total ${greenSum}`
      // );
    }
  }
  console.log(gameIDSummed);
});
