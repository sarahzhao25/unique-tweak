const {Card, shapes, colors, numbers, fills} = require('./deckCreator');

class Game {
  constructor(deck) {
    this.deck = deck;
  }

}

  //Is this pair a set?
Game.checkSet = (C1, C2, C3) => {
  let comparison = Game.finishTheSet(C1, C2);
  return comparison.shape === C3.shape && comparison.color === C3.color && comparison.number === C3.number && comparison.fill === C3.fill;
}

Game.finishTheSet = (C1, C2) => {
  const shape = (shapes.indexOf(C1.shape) === shapes.indexOf(C2.shape)) ? C1.shape : shapes.find(shape => shape !== C1.shape && shape !== C2.shape);

  const color = (colors.indexOf(C1.color) === colors.indexOf(C2.color)) ? C1.color : colors.find(color => color !== C1.color && color !== C2.color);

  const number = (numbers.indexOf(C1.number) === numbers.indexOf(C2.number)) ? C1.number : numbers.find(number => number !== C1.number && number !== C2.number);

  const fill = (fills.indexOf(C1.fill) === fills.indexOf(C2.fill)) ? C1.fill : fills.find(fill => fill !== C1.fill && fill !== C2.fill);

  return new Card(shape, color, number, fill);
}

Game.findAllPossibleSets = (board) => {
  let allSets = [];
  for (var i = 0; i < board.length - 2; i++) {
    for (var j = i + 1; j < board.length - 1; j++) {

      if (allSets.some(combo => combo.includes(board[i]) && combo.includes(board[j]))) continue;

      for (var k = i + 2; k < board.length; k++) {
        if (Game.checkSet(board[i], board[j], board[k])) {
          allSets.push([board[i], board[j], board[k]])
        }
      }
    }
  }
  console.log(allSets)
  return allSets;
}

module.exports = Game;
