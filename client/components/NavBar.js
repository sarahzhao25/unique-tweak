import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleActive: 'active',
      rulesActive: '',
      learnActive: '',
      nameActive: ''
    }
    this.handleRulesClick = this.handleRulesClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleLearnClick = this.handleLearnClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
  }

  handleTitleClick() {
    this.setState({titleActive: 'active', rulesActive: '', learnActive: '', nameActive: ''})
  }

  handleRulesClick() {
    this.setState({titleActive: '', rulesActive: 'active', learnActive: '', nameActive: ''})
  }

  handleLearnClick() {
    this.setState({titleActive: '', rulesActive: '', learnActive: 'active', nameActive: ''})
  }


  handleNameClick() {
    this.setState({titleActive: '', rulesActive: '', learnActive: '', nameActive: 'active'})
  }

  render() {
    return (
      <div className="ui inverted tabular menu">
      <Link
        to="/"
        className={`item ${this.state.titleActive}`}
        onClick={this.handleTitleClick}
      >
        The Unique Tweak
      </Link>
      <a
        className={`item ${this.state.rulesActive}`}
        onClick={this.handleRulesClick}
        id="nav-bar-rules"
      >
        Rules
      </a>
      <a
      className={`item ${this.state.learnActive}`}
      onClick={this.handleLearnClick}
      id="nav-bar-learn"
    >
      Learn More
    </a>
    <a
    className={`item ${this.state.nameActive}`}
    onClick={this.handleNameClick}
    id="nav-bar-name"
  >
    Change Name!
  </a>
    </div>
    )
  }
}

export default withRouter(NavBar);
