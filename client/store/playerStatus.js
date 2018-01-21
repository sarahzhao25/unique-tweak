const RESET_GAME = 'RESET_GAME';
const END_GAME = 'END_GAME';

export const resetGame = () => {
  return {
    type: RESET_GAME,
    reset: {
      won: false,
      endGame: false
    }
  }
}

export const endGame = (winOrLose) => {
  return {
    type: END_GAME,
    result: {
      won: winOrLose,
      endGame: true
    }
  }
}

export default (result = {won: false, endGame: false}, action) => {
  switch (action.type) {
    case RESET_GAME:
      return action.reset;
    case END_GAME:
      return action.result;
    default:
      return result;
  }
}
