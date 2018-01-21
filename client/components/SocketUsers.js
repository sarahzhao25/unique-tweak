import React, {Component} from 'react';
import {connect} from 'react-redux';

class SocketUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // users: []
    }
  }

  render() {
    return (
      <div className="item">
        <div className="header">
          Users
        </div>
          <div className="menu">
          {this.props.users.map((user, id) => (
            <div key={id} className="item">{`${user.name} -  ${user.score}`}</div>
          )) }
          </div>
      </div>
    )
  }
}

const mapStateToDispatch = (state) => {
  return {
    users: state.socketUsers
  }
}

export default connect(mapStateToDispatch)(SocketUsers);
