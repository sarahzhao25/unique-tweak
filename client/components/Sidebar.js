import React from 'react';
import SocketUsers from './SocketUsers';

const Sidebar = (props) => {
  return (
    <div className="container-sidebar">
      <div className="ui visible inverted right vertical sidebar menu">
        <SocketUsers />
      </div>
    </div>
  )
}

export default Sidebar;
