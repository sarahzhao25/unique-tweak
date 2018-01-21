import React from 'react';
import {SocketUsers, ChatMessages, MessageForm} from './index';

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
        <ChatMessages  />
        <MessageForm />
      </div>
    </div>
  )
}

export default Sidebar;
