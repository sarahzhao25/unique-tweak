import React from 'react';

const CardView = (props) => {
  const {shape, color, number, fill} = props.card;
  const numElems = [];
  for (var i = 0; i < number; i++) {
    numElems.push(<div key={i} className={`${shape}-${color}-${fill}`} />);
  }
  return (
      <div className="content">
        {numElems.map(elem => elem)}
      </div>
)}

export default CardView;
