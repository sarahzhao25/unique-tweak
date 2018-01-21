import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import socketUsers from './socketUsers';
import layout from './layout';
import playerStatus from './playerStatus';

const reducer = combineReducers({socketUsers, layout, playerStatus})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './socketUsers';
export * from './layout';
export * from './playerStatus';
