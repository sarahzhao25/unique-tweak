import React from 'react';

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
    <p>4. You score 3 points if you find a correct set, and lose 3 if you incorrectly identify a set.</p>
    <p>5. No points are lost when hints are provided.</p>

    </div>
  </div>
  )
}

export default RulesModal;
