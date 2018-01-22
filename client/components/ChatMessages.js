import React from 'react';
import {connect} from 'react-redux';

function ChatMessages(props) {
  return (
    <div className="item">
    <div className="header">
    Message Log
    </div>
    <div className="menu" id="chat">
      <div className="item">Admin: Welcome to TWEAK messages! Start posting below. Player updates will also be posted.</div>
      {props.messages.map((message, i) => (
        <div key={i} className="item">{message}</div>
    ))}
    </div>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(ChatMessages);
