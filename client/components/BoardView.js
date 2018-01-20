import React, {Component} from 'react';
import {deck} from '../utils/Deck';
import Game from '../utils/Game';
import shuffle from 'shuffle-array';
import {CardView} from './index';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingBoard: [],
      deck: [],
      setChoice: [],
      setIndices: [],
      numRows: 'four',
      background: false
    }
    this.deck = deck;

    this.createBoard = this.createBoard.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.add3 = this.add3.bind(this);
    this.addChoices = this.addChoices.bind(this);
    this.replaceChoices = this.replaceChoices.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  handleReset() {
    this.createBoard();
    //other things - reset score?
  }

  add3() {
    if (this.state.deck.length && this.state.playingBoard.length < 15) {
    this.setState({playingBoard: this.state.playingBoard.concat(this.state.deck.splice(0, 3)), numRows: 'five'});
    }
  }

  createBoard() {
    let newDeck = shuffle(this.deck).slice();
    this.setState({playingBoard: newDeck.slice(0, 12), deck: newDeck.slice(12), numRows: 'four', setChoice: [], setIndices: []});
  }

  addChoices(card) {
    console.log(this.state.setChoice)
    if (!this.state.setChoice.includes(card)) {
      this.setState({setChoice: this.state.setChoice.concat(card), setIndices: this.state.setIndices.concat(this.state.playingBoard.indexOf(card)), background: !this.state.background});
    }
    else {
      let i = this.state.setChoice.findIndex(a => a === card);
      this.setState({setChoice: this.state.setChoice.slice(0, i).concat(this.state.setChoice.slice(i + 1)), setIndices: this.state.setIndices.slice(0, i).concat(this.state.setIndices.slice(i + 1)), background: !this.state.background})
    }
  }

  checkTheSet() {
    if (Game.checkSet(...this.state.setChoice, this.state.deck)) {
      this.replaceChoices();
      return true;
    }
    else {
      this.setState({setChoice: [], setIndices: []});
      return false;
    }

  }

  replaceChoices() {
    let playboard = this.state.playingBoard.slice();
    if (this.state.deck.length && this.state.playingBoard.length === 12) {
      this.state.setIndices.forEach(index => {playboard[index] = this.state.deck.shift()})
    }
    else {
      playboard = playboard.filter((card, index) => !this.state.setIndices.includes(index))
    }
    this.setState({setChoice: [], playingBoard: playboard, setIndices: [], numRows: 'four'});
  }

  toggle() {
    return this.state.background;
  }

  render() {
    //console.log(this.state)
    this.state.setChoice.length === 3 && (this.checkTheSet())
    return (
      <div>
        <button className="ui button" onClick={this.handleReset}>New Game!</button>
        <button className="ui button" onClick={this.add3}>No set? Add 3</button>
        <button className="ui button" onClick={() => Game.findAllPossibleSets(this.state.playingBoard)}>Find me a set..</button>
        <button className="ui button primary">SET!</button>
        <div /><br />
        <div className={`ui ${this.state.numRows} cards`}><br />
        {this.state.playingBoard.map((card, i) => (
          <div
            key={i}
            className="ui link card red"
            onClick={() => this.addChoices(card)}
          >
            <CardView card={card} toggle={this.toggle} />
          </div>))}
        </div>
      </div>
    )
  }
}

export default BoardView;
