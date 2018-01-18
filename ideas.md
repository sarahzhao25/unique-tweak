WEB Application - SET - Multiplayer
Day 1 - focus on outline, maybe start a simple set of React components

Overall Day goals:
- Plan out outlines of views that I want
- Plan out logic behind the game
  - For Multiplayer: what do you want each player to have?
  - Will I need to seed the database with the pre-defined cards?

1. SET Game Rules
CARDS:
- the cards each have 4 attributes: number, size, shape, and shade.
- Each attribute has 3 possible properties.
- This means that for every number, there are 3 sizes, for every size, there are 3 shapes, for every shape, there are 3 shades. Number(3) * size(3) * shape(3) * shade(3) = 81 cards.

So then - why do 2 cards only pair with 1 more card?
1 card:
- shape
- color
- number
- shade

When you choose 2 cards, those cards need to have either identical or different attribute types. Given the restriction of ALL or NONE, the last card MUST have the SAME type, or a DIFFERENT type - and there are only 3 possibilities. This restricts the card to be just 1 card.

The probability of producing a Set from 3 randomly drawn cards in a complete deck is 1/79.

GAME:
