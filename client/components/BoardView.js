import React, {Component} from 'react';
import {deck} from '../utils/Deck';
import {CardView} from './Index';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="ui cards">
      {deck.map((card, i) => (<div key={i} className="ui card large"><CardView card={card} /></div>))}
      </div>
    )
  }
}

export default BoardView;
