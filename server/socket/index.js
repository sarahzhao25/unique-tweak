const shuffle = require('shuffle-array');
const {deck} = require('./deckCreator');
const Game = require('./gameLogic');

module.exports = (io) => {
//CURRENT PLAYERS IN THE GAME
const possibleNames = ['Sam', 'Sandy', 'Sarah', 'Kevin', 'Jesse', 'James', 'Shannen', 'Diana', 'Omri', 'Cassio', 'Corey', 'Mel', 'Vesna', 'Leigh', 'Mark'];

//Player constructor.
function Player(name, id) {
  this.name = name;
  this.score = 0;
  this.socketId = id;
}

let currentPlayers = [];

//Game State
let playingBoard = [];
let remainingDeck = [];
let numRows = 'four';
let background = false;

const newPlayerAddition = (socket) => {
  console.log(`A socket connection to the server has been made: ${socket.id}`)
  socket.player = new Player(possibleNames[Math.floor(Math.random() * possibleNames.length)], socket.id);
  currentPlayers.push(socket.player);
}

const findOrCreateBoard = () => {
  if (!playingBoard.length) {
    remainingDeck = shuffle(deck).slice();
    playingBoard = remainingDeck.splice(0, 12);
  }
  return {remainingDeck, playingBoard};
}

const replaceChoices = (indices) => {
  let playboard = playingBoard.slice();
  if (remainingDeck.length && playingBoard.length === 12) {
    indices.forEach(index => {
      playboard[index] = remainingDeck.shift();
    })
    playingBoard = playboard;
  }
  else {
    playboard = playboard.filter((card, index) => !indices.includes(index))
  }
  io.emit('add-game-layout', findOrCreateBoard())
}

const testSet = (setChoices, setIndices, socket) => {
  if (Game.checkSet(...setChoices)) {
    socket.player.score = socket.player.score + 3;
    replaceChoices(setIndices);
  }
  else {
    socket.player.score = socket.player.score - 3;
  }
  io.emit('updated-players-list', currentPlayers);
}


  io.on('connection', (socket) => {

    //checking board state - is there a game in play?
    socket.emit('add-game-layout', findOrCreateBoard());

    //New players arriving
    newPlayerAddition(socket);
    socket.on('update', () => {
      io.emit('updated-players-list', currentPlayers);
    })

    //test the set and replace cards
    socket.on('test-set', (setChoices, setIndices) => testSet(setChoices, setIndices, socket));

    //can't find a set and need to add 3  cards
    socket.on('add-three', () => {
      if (remainingDeck.length && playingBoard.length < 15) {
        playingBoard = playingBoard.concat(remainingDeck.splice(0, 3));
        io.emit('add-game-layout', findOrCreateBoard());
      }
    })
    //reset the game
    socket.on('reset-board', () => {
      console.log('hi')
      playingBoard = [];
      remainingDeck = [];
      let layout = findOrCreateBoard();
      io.emit('add-game-layout', layout);
    })

    //disconnecting
    socket.on('disconnect', () => {
      let index = currentPlayers.findIndex(player => player.socketId === socket.id);
      currentPlayers.splice(index, 1);
      socket.broadcast.emit('updated-players-list', currentPlayers);

      // socket.broadcast.emit('deleteSocket', socket.id);
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
