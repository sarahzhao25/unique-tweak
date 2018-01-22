import React from 'react';
import CardView from './CardView';

const card1 = {
  shape: 'oval',
  color: 'red',
  number: '3',
  fill: 100
}

const card2 = {
  shape: 'oval',
  color: 'green',
  number: '3',
  fill: 100
}

const card3 = {
  shape: 'oval',
  color: 'purple',
  number: '3',
  fill: 100
}

const RulesModal = () => {
  return (
    <div className="ui basic modal" id="rulesModal">
    <div className="ui icon header">
      Rules of the Game: Unique Tweak (or Set)
    </div>
    <div className="content">
    <p>
    1. Each card has 4 attributes: shape, number, color, and fill.</p>
    <p>
    2. Each of those attributes have 3 possibilities: (shape: diamond, parallelogram, oval, number: 1, 2, 3, color: red, green, purple
    fill: clear, striped, solid.</p>
    <p>3. One 'SET' (or Tweak as we are affectionately calling it) will consist of 3 cards that match the condition:
    Each of the attributes of the set must either be ALL the same, or ALL different.</p>
    <p>4. You score 3 points if you find a correct set, and lose 2 if you incorrectly identify a set.</p>
    <p>5. No points are lost when hints are provided, but points are lost if you incorrectly try to add cards to a playing board that HAS a set.</p>
    <img src="https://mrrgteacher.files.wordpress.com/2011/12/sets_examples1-1024x586.png?w=320&h=183?maxWidth=500" />
    <p>Source: [https://mrrgteacher.files.wordpress.com/2011/12/sets_examples1-1024x586.png?w=320&h=183?maxWidth=500]</p>
    </div>
  </div>
  )
}

export default RulesModal;
