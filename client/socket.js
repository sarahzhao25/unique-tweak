import io from 'socket.io-client'
import store, {gotUsers, newLayout, endGame, resetGame} from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {

  socket.emit('update');
})

socket.on('updated-players-list', (currentPlayers) => {
  store.dispatch(gotUsers(currentPlayers))
})

socket.on('add-game-layout', (gameLayout) => {
  store.dispatch(newLayout(gameLayout));
  //store.dispatch(resetGame());
})

socket.on('you-win', (players) => {
  store.dispatch(endGame(true));
})

socket.on('you-lose', (players) => {
  store.dispatch(endGame(false));
})

socket.on('reset-status', () => {
  store.dispatch(resetGame());
})

export default socket
