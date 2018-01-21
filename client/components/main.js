import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {BoardView, Sidebar, RulesModal, NavBar, LearnMoreModal} from './index';

const Main = (props) => {
  const {remainingDeck} = props;
  return (
    <div className="wall-color">
      <NavBar />
      <RulesModal />
      <LearnMoreModal />
      <div className="container" >
        <div className="container-board">
          <BoardView />
        </div>
        <Sidebar remainingDeck= {remainingDeck.length} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    remainingDeck: state.layout.remainingDeck
  }
}

const mapDispatch = (dispatch) => {
  return {
    }
}

export default withRouter(connect(mapState, mapDispatch)(Main))
