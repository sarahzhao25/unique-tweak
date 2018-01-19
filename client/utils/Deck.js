//4 attributes of each card
export const shapes = ['oval', 'diamond', 'parallelogram'];
export const colors = ['red', 'green', 'purple'];
export const numbers = [1, 2, 3];
export const fills = [0, 50, 100];

//individual Card class
export class Card {
  constructor(shape, color, number, fill) {
    this.shape = shape;
    this.color = color;
    this.number = number;
    this.fill = fill;
  }
}

//function that will create a bunch of cards, aka a deck
export const cardCreator = (s, c, n, f, arr) => {
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

export const deck = cardCreator(shapes, colors, numbers, fills, []);
