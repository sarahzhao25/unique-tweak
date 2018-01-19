/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './Main'
export {Login, Signup} from './Auth-form'
export {default as CardView} from './CardView';
export {default as BoardView} from './BoardView';
