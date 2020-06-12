
// using Knuth Shuffle as said on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// for an unbiased shuffle of the teams for the tournament
export function shuffleArray(array: Array<any>) {
  // tslint:disable-next-line: one-variable-per-declaration
  let currentIndex = array.length, temporaryValue, randomIndex;


  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
