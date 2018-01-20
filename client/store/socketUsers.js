import socket from '../socket';
import axios from 'axios';

const CONNECTED_USER = 'CONNECTED_USER';
const DISCONNECTED_USER = 'DISCONNECTED_USER';
const GOT_USERS = 'GOT_USERS';

export const gotUsers = (users) => {
  return {
    type: GOT_USERS,
    users
  }
}

export function connectUser(socketUser) {
  return (dispatch) => {
    axios.post('/api/socketUsers', {name: socketUser})
    .then(users => dispatch(gotUsers(users.data)))
    .catch(console.error);
  }
}

export const disconnectUser = (socketUser) => {
  return (dispatch) => {
    axios.delete(`/api/socketUsers/${socketUser}`)
    .then(users => dispatch(gotUsers(users.data)))
    .catch(console.error);
  }
}

export function getUsers() {
  return (dispatch) => {
    axios.get('/api/socketUsers')
    .then(users => dispatch(gotUsers(users.data)))
    .catch(console.error);
  }
}

export default (socketUsers = [], action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    default:
      return socketUsers;
  }
}
