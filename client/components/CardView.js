import React from 'react';

const CardView = (props) => {
  const {shape, color, number, fill, background, foundSet} = props.card;
  const numElems = [];
  for (var i = 0; i < number; i++) {
    numElems.push(<div key={i} className={`${shape}-${color}-${fill}`} />);
  }
  let result = background ? 'background' : foundSet ? 'foundSetBackground' : '';
  return (
    <div className= {`${result} content`}>
      {numElems.map(elem => elem)}
    </div>
  )
}

export default CardView;
