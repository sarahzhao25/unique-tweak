import React, {Component} from 'react';
import {deck} from '../utils/Deck';
import Game from '../utils/Game';
import shuffle from 'shuffle-array';
import {CardView} from './Index';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingBoard: [],
      deck: [],
      setChoice: [],
      setIndices: []
    }
    this.deck = deck;

    this.createBoard = this.createBoard.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.add3 = this.add3.bind(this);
    this.addChoices = this.addChoices.bind(this);
    this.resetChoices = this.resetChoices.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.createBoard();
  }

  handleReset() {
    this.createBoard();
    //other things - reset score?
  }

  add3() {
    if (this.state.deck.length && this.state.playingBoard.length < 20) {
    this.setState({playingBoard: this.state.playingBoard.concat(this.state.deck.splice(0, 3))});
    }
  }

  createBoard() {
    let newDeck = shuffle(this.deck).slice();
    this.setState({playingBoard: newDeck.slice(0, 12), deck: newDeck.slice(12)});
  }

  addChoices(card) {
    if (!this.state.setChoice.includes(card)) {
      this.setState({setChoice: this.state.setChoice.concat(card), setIndices: this.state.setIndices.concat(this.state.playingBoard.indexOf(card))});
    }
  }

  checkTheSet() {
    if (Game.checkSet(...this.state.setChoice, this.state.deck)) {
      this.resetChoices();
      return true;
    }
    else {
      this.setState({setChoice: [], setIndices: []});
      return false;
    }

  }

  resetChoices() {
    let playboard = this.state.playingBoard.slice();
    if (this.state.deck.length) {
      this.state.setIndices.forEach(index => {playboard[index] = this.state.deck.shift()})
    }
    else {
      playboard = playboard.filter((card, index) => !this.state.setIndices.includes(index))
    }
    this.setState({setChoice: [], playingBoard: playboard, setIndices: []});
  }

  render() {
    console.log(this.state)
    this.state.setChoice.length === 3 && (this.checkTheSet())
    return (
      <div>
        <button className="ui button" onClick={this.handleReset}>Reset Game!</button>
        <button className="ui button" onClick={this.add3}>No set? Add 3</button>
        <button className="ui button" onClick={this.findSet}>Find me a set..</button>
        <div /><br />
        <div className="ui cards"><br />
        {this.state.playingBoard.map((card, i) => (
          <div
            key={i}
            className="ui link card"
            onClick={() => this.addChoices(card)}
          >
            <CardView card={card} />
          </div>))}
        </div>
      </div>
    )
  }
}

export default BoardView;
