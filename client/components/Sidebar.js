import React from 'react';
import SocketUsers from './SocketUsers';

const Sidebar = (props) => {
  return (
    <div className="container-sidebar">
      <div className="ui visible inverted right vertical sidebar menu">
        <div className="item">
          <div className="header">
          Cards Remaining: {props.remainingDeck}
          </div>
        </div>
        <SocketUsers />
        <div className="item">
          <div className="header">
          What else can I put here...
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
