const shuffle = require('shuffle-array');
const {deck} = require('./deckCreator');
const Game = require('./gameLogic');

module.exports = (io) => {
  const possibleNames = ['Sam', 'Sandy', 'Sarah', 'Kevin', 'Jesse', 'James', 'Shannen', 'Diana', 'Omri', 'Cassio', 'Corey', 'Mel', 'Vesna', 'Leigh', 'Mark'];

  //Player constructor.
  function Player(id) {
    this.name = 'Anonymous Guest';
    this.score = 0;
    this.socketId = id;
  }

  //Game State
  let currentPlayers = [];
  let playingBoard = [];
  let remainingDeck = [];
  let messages = [];

  const newPlayerAddition = (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.player = new Player(socket.id);
    currentPlayers.push(socket.player);
  }

  const sortPlayers = () => {
    return currentPlayers.sort((a, b) => {
      if (a.score > b.score) return -1;
      else if (a.score < b.score) return 1;
      else return 0;});
  }

  const findOrCreateBoard = () => {
    if (!playingBoard.length) {
      //determining new deck
      remainingDeck = shuffle(deck).slice();
      remainingDeck.forEach(card => {
        card.background = false;
        card.foundSet = false;
      })
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
    }
    else {
      playboard = playboard.filter((card, index) => !indices.includes(index))
    }
    playingBoard = playboard;
    playingBoard.forEach(card => {
      card.background = false;
      card.foundSet = false;
    })
    io.emit('add-game-layout', findOrCreateBoard())
  }

  const testSet = (setChoices, setIndices, socket) => {
    if (Game.checkSet(...setChoices)) {
      socket.player.score = socket.player.score + 3;
      replaceChoices(setIndices);
      let name = currentPlayers.find(player => player.socketId === socket.id).name;
      messages.push(`${name} has found a SET! Nice one!`);
      io.emit('added-messages', messages);
    }
    else {
      socket.player.score = socket.player.score - 2;
      playingBoard = playingBoard.map(card => {
        card.background = false;
        return card;
      });
      socket.emit('add-game-layout', findOrCreateBoard());
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
      io.emit('added-messages', messages);
    })

    //player changing names
    socket.on('change-name', (name) => {
      currentPlayers.find(player => player.socketId === socket.id).name = (!name.replace(/\W/g, '').length) ? 'Anonymous Guest' : name;
      io.emit('updated-players-list', currentPlayers);
    })

    //test the set and replace cards
    socket.on('test-set', (setChoices, setIndices) => testSet(setChoices, setIndices, socket));

    //can't find a set and need to add 3  cards
    socket.on('add-three', () => {
      if (remainingDeck.length && playingBoard.length < 15) {
        let setsArr = Game.findAllPossibleSets(playingBoard);
        if (setsArr.length) {
          currentPlayers.find(player => player.socketId === socket.id).score--;
          io.emit('updated-players-list', currentPlayers);
        }
        else {
        playingBoard = playingBoard.concat(remainingDeck.splice(0, 3));
        io.emit('add-game-layout', findOrCreateBoard());
        }
      }
    })

    //can't find a set and want a HINT SET
    socket.on('find-set', () => {
      playingBoard.forEach(card => {card.foundSet = false});
      let setsArr = Game.findAllPossibleSets(playingBoard);
      let random = Math.floor(Math.random() * setsArr.length);
      if (setsArr[random]) {
          setsArr[random].forEach(card => {card.foundSet = true});
          let name = currentPlayers.find(player => player.socketId === socket.id).name;
          messages.push(`${name} has used a hint...shame, shame.`);
          io.emit('added-messages', messages);
        }
      else if (!remainingDeck.length) {
        let playerList = sortPlayers();
        let winner = playerList[0].socketId;
        if (socket.id === winner) {
          socket.emit('you-win', playerList);
          socket.broadcast.emit('you-lose', playerList);
        }
        else {
          socket.emit('you-lose', playerList);
          socket.broadcast.to(winner).emit('you-win', playerList);

          Object.keys(io.sockets.sockets).filter(socketId => socketId !== socket.id && socketId !== winner).forEach(socketId => {
            socket.broadcast.to(socketId).emit('you-lose', playerList);
          })
        }
      }
      io.emit('add-game-layout', findOrCreateBoard());
    });

    //reset the game
    socket.on('reset-board', () => {
      playingBoard.forEach(card => {
        card.background = false;
        card.foundSet = false;
      })
      playingBoard = [];
      remainingDeck = [];
      currentPlayers.forEach(player => {
        player.score = 0;
      })
      messages = [];
      io.emit('add-game-layout', findOrCreateBoard());
      io.emit('reset-status');
      io.emit('updated-players-list', currentPlayers);
      io.emit('added-messages', messages);
    })

    //disconnecting
    socket.on('disconnect', () => {
      let index = currentPlayers.findIndex(player => player.socketId === socket.id);
      currentPlayers.splice(index, 1);
      socket.broadcast.emit('updated-players-list', currentPlayers);

      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('add-message', (message) => {
      let name = currentPlayers.find(player => player.socketId === socket.id).name;
      messages.push(`${name} says:  ${message}`);
      io.emit('added-messages', messages);
    })
  })
}
