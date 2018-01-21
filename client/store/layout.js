
const NEW_LAYOUT = 'NEW_LAYOUT';
//layout = {remainingDeck: [], playingBoard: []}
export function newLayout(layout) {
  console.log(layout)
  return (layout.playingBoard.length > 12) ? {
    type: NEW_LAYOUT,
    layout,
    numRows: 'five'
  } : {
    type: NEW_LAYOUT,
    layout,
    numRows: 'four'
  }
}

export default (layout = {remainingDeck: [], playingBoard: [], numRows: 'four'}, action) => {
  switch (action.type) {
    case NEW_LAYOUT:
    action.layout.numRows = action.numRows;
      return action.layout;
    default:
      return layout;
  }
}
