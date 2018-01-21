import React from 'react';
import socket from '../socket';

const SubmitNameModal = (props) => {
  return (
    <div className="ui basic modal" id="nameModal">
      <div className="ui icon header">
        Welcome to Unique Tweak! What's your name?
          <form
            className="ui-form"
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit('change-name', e.target.name.value);
            }}>
            <div className="field item">
              <input
                id="submitNameInput"
                className="form-input"
                type="text"
                name="name"
              />
            </div>
      </form>
      </div>
  </div>
  )
}

export default SubmitNameModal;
