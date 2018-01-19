import {deck} from '../utils/Deck';
import Game from '../utils/Game';

const newGame = new Game(deck);

const RESET_BOARD = 'RESET_BOARD';

const resetBoard = (newBoard) => {
  return {
    type: RESET_BOARD,
    newBoard
  }
}

export function boardReducer (board = [], action) {
  switch (action.type) {
    case RESET_BOARD:
      return action.newBoard;
    default:
      return board;
  }
}
