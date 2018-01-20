import io from 'socket.io-client'
import store, {connectUser, disconnectUser} from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {

  store.dispatch(connectUser(socket.id))

  socket.emit('arrived', socket.id);

  socket.on('newSocket', (id) => {
    store.dispatch(connectUser(id))
  })

  socket.on('deleteSocket', (id) => {
    store.dispatch(disconnectUser(id))
  })
})

export default socket
