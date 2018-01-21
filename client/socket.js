import io from 'socket.io-client'
import store, {gotUsers, newLayout} from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {

  socket.emit('update');
})

socket.on('updated-players-list', (currentPlayers) => {
  store.dispatch(gotUsers(currentPlayers))
})

socket.on('add-game-layout', (gameLayout) => {
  store.dispatch(newLayout(gameLayout));
})


//in progress

export const Client = {};

//set button has been clicked
Client.SETCALL = function() {
  socket.emit('set-call');
}
//should result in other players unable to call.

//replace cards on all
Client.replaceCards = function(setChoice) {
  socket.emit('replace-cards', setChoice);
}

//create the board to all incoming players, regardless of whether or not the game is in-play.
Client.broadcastBoard = function(playingBoard, deck) {
  socket.emit('broadcast-board', playingBoard, deck);
}

//add 3.
Client.addThree = function() {
  socket.emit('add-three');
}

export default socket
