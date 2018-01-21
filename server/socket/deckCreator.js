//CARD AND DECK CREATORS.

//4 attributes of each card
const shapes = ['oval', 'diamond', 'parallelogram'];
const colors = ['red', 'green', 'purple'];
const numbers = [1, 2, 3];
const fills = [0, 50, 100];

//individual Card class
class Card {
  constructor(shape, color, number, fill) {
    this.shape = shape;
    this.color = color;
    this.number = number;
    this.fill = fill;
    this.background = false;
    this.foundSet = false;
  }
}

//function that will create a bunch of cards, aka a deck
const deckCreator = (s, c, n, f, arr) => {
  s.forEach(shape => {
    c.forEach(color => {
      n.forEach(number => {
        f.forEach(fill => {
          arr.push(new Card(shape, color, number, fill));
        })
      })
    })
  })
  return arr;
}

const deck = deckCreator(shapes, colors, numbers, fills, []);

module.exports = {Card, deck, deckCreator, shapes, colors, numbers, fills};
