import React, {Component} from 'react';
import {connect} from 'react-redux';
import socket from '../socket';
import Game from '../utils/Game';
import {CardView} from './index';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setChoice: [],
      setIndices: [],
      foundSet: false,
      startGame: true
    }
    this.addChoices = this.addChoices.bind(this);
    this.unClickChoice = this.unClickChoice.bind(this);
    this.resetChoice = this.resetChoice.bind(this);
    this.findSet = this.findSet.bind(this);
  }

  resetChoice() {
    this.setState({setChoice: [], setIndices: [], foundSet: false, startGame: true})
  }

  addChoices(card, playingBoard) {
    console.log(this.state.setChoice)
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
        //playingBoard.forEach(c => {if (c !== card) c.background = false});
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

  findSet(playingBoard) {
    playingBoard.forEach(card => {card.foundSet = false});
    let setsArr = Game.findAllPossibleSets(playingBoard);
    let random = Math.floor(Math.random() * setsArr.length);
    if (setsArr[random]) {
      setsArr[random].forEach(card => {card.foundSet = true});
    }
    this.setState({startGame: false});
  }

  render() {
    let {remainingDeck, playingBoard, numRows} = this.props;
    return (
      <div>
        <button className="ui button" onClick={() => {socket.emit('reset-board'); this.resetChoice();}}>Too Hard? New Game!</button>
        <button className="ui button" onClick={() => socket.emit('add-three')}>No set? Add 3</button>
        <button className="ui button" onClick={() => this.findSet(playingBoard)}>Find me a set..</button>
        <span>{this.state.foundSet ? 'YES!' : this.state.startGame ? 'Hint: it may be an oval' : 'Boo, you suck'}</span>
        <div /><br />
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
    numRows: state.layout.numRows
  }
}

export default connect(mapStateToProps)(BoardView);
