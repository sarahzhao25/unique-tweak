import React, {Component} from 'react';
import {connect} from 'react-redux';
import socket from '../socket';
import {CardView, WinModal} from './index';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setChoice: [],
      setIndices: [],
      foundSet: false,
      startGame: true,
    }
    this.addChoices = this.addChoices.bind(this);
    this.unClickChoice = this.unClickChoice.bind(this);
    this.resetChoice = this.resetChoice.bind(this);
  }

  resetChoice() {
    this.setState({setChoice: [], setIndices: [], foundSet: false, startGame: true})
  }

  addChoices(card, playingBoard) {
    //if the set was TAKEN, but was part of this person's choice
    if (this.state.setChoice.some(choice => playingBoard.indexOf(choice) === -1)) {
      this.setState({setChoice: [card], setIndices: [playingBoard.indexOf(card)]});
    }
    //if the set does NOT include the card - test or add to set
    else if (!this.state.setChoice.includes(card)) {
      let set = this.state.setChoice.concat(card);
      let indices = this.state.setIndices.concat(playingBoard.indexOf(card));

      if (this.state.setChoice.length === 2) {
        socket.emit('test-set', set, indices)
        this.setState({setChoice: [], setIndices: []});
      }
      else {
        this.setState({setChoice: set, setIndices: indices});
      }
    }
    //unclick the card if it is already there
    else {
      this.unClickChoice(card);
    }
  }

  unClickChoice(card) {
    let i = this.state.setChoice.findIndex(a => a === card);
    this.setState({setChoice: this.state.setChoice.slice(0, i).concat(this.state.setChoice.slice(i + 1)), setIndices: this.state.setIndices.slice(0, i).concat(this.state.setIndices.slice(i + 1))})
  }

  render() {
    let {remainingDeck, playingBoard, numRows, endGame, result} = this.props;
    return (
      <div>
        <WinModal />
        <div>
          <h1 className="resultDiv">{endGame ? result ? 'YOU WIN! Man, you\'re such a champion!' : 'YOU LOSE! I think you need to check your eyes!' : null}</h1>
        </div>
        <button className="ui button red" onClick={() => {socket.emit('reset-board'); this.resetChoice();}}>{endGame ? 'Play Again!' : 'Too Hard? New Game!'}</button>
        <button
          className="ui button blue"
          onClick={() => socket.emit('add-three')}
          disabled={endGame}
        >No set? Add 3</button>
        <button
          className="ui button green"
          onClick={() => socket.emit('find-set')}
          disabled={endGame}
          >Find set, please.</button>
        <div className={`ui ${numRows} cards`}><br />
        {playingBoard.map((card, i) => (
          <div
            key={i}
            className="ui link card red"
            onClick={() => {
              card.background = !card.background;
              this.addChoices(card, playingBoard);
            }}
          >
            <CardView card={card} />
          </div>))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    remainingDeck: state.layout.remainingDeck,
    playingBoard: state.layout.playingBoard,
    numRows: state.layout.numRows,
    result: state.playerStatus.won,
    endGame: state.playerStatus.endGame
  }
}

export default connect(mapStateToProps)(BoardView);
