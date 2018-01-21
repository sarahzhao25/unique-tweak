import React from 'react';
import {connect} from 'react-redux';

function ChatMessages(props) {
  return (
    <div className="item">
    <div className="header">
    Messages: Heckle time!
    </div>
    <div className="menu">
      <div className="item">Admin: Welcome to TWEAK messages! Start posting below.</div>
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
