import React from 'react';
import socket from '../socket';

const MessageForm = (props) => {
  return (
    <form
      className="ui mini form"
      onSubmit={(e) => {
        e.preventDefault();
        socket.emit('add-message', e.target.entry.value);
        e.target.entry.value = '';
      }}>
    <div className="field item">
      <label>Something to say?</label>
      <input
        className="form-input"
        type="text"
        name="entry"
        placeholder="I love pizza"
      />
    </div>
    </form>
  )
}

export default MessageForm;
