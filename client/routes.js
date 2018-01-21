import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import history from './history'
import {Main} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Router history={history}>
        <Main>
          <Switch />
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Routes)
