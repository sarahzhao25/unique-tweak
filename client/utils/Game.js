import {Card, shapes, colors, numbers, fills} from './Deck';
import shuffle from 'shuffle-array';

class Game {
  constructor(deck) {
    this.deck = deck;
  }
  //refreshes if you clicked 'new Game'
  clearGame() {
    return new Game(shuffle(this.deck).slice());
  }
  //figures out the set given the rules of the game
  firstTwelve() {
    return this.deck.splice(0, 12);
  }

}

  //Is this pair a set?
Game.checkSet = (C1, C2, C3) => {
    return JSON.stringify(Game.finishTheSet(C1, C2)) === JSON.stringify(C3);
}

Game.finishTheSet = (C1, C2) => {
  const shape = (shapes.indexOf(C1.shape) === shapes.indexOf(C2.shape)) ? C1.shape : shapes.find(shape => shape !== C1.shape && shape !== C2.shape);

  const color = (colors.indexOf(C1.color) === colors.indexOf(C2.color)) ? C1.color : colors.find(color => color !== C1.color && color !== C2.color);

  const number = (numbers.indexOf(C1.number) === numbers.indexOf(C2.number)) ? C1.number : numbers.find(number => number !== C1.number && number !== C2.number);

  const fill = (fills.indexOf(C1.fill) === fills.indexOf(C2.fill)) ? C1.fill : fills.find(fill => fill !== C1.fill && fill !== C2.fill);

  return new Card(shape, color, number, fill);
}

Game.findAllPossibleSets = (board) => {
  console.log('I found it?')
}

export default Game;
