import React from 'react';

export default function WinModal(props) {
  return (
    <div className="ui mini modal" id="winModal">
      <div className="header">
        CONGRATULATIONS!
      </div>
      <div className="description">
        <p>You win! Let's play again!</p>
      </div>
    </div>
  )
}
