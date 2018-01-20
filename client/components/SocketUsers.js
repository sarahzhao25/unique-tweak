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
    console.log(this.props.users)
    return (
      <div className="item">
          <div className="header">
            Users
          </div>
          <div className="menu">
          {/*this is where i will map all of the session users*/}
          {this.props.users.map((user, id) => (
            <div key={id} className="item">{user.name}</div>
          )) }
            <div className="item">Sarah</div>
            <div className="item">Bob</div>
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
