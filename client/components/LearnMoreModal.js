import React from 'react';

export default function LearnMoreModal(props) {
  return (
    <div className="ui mini modal" id="learnMoreModal">
      <div className="ui header">
        Some resources:
      </div>
      <div className="description">
        <p><a href="https://www.setgame.com/set/puzzle">SET Enterprises, Inc.</a></p>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set">Sets in Javascript</a></p>
        <p><a href="http://puzzles.setgame.com/set/mathtricks.htm">The Magic Behind Set!</a></p>
        <p><a href="https://brilliant.org/wiki/set-game/">More Math...</a></p>
        <p>Thanks for playing!</p>
      </div>
    </div>
  )
}
