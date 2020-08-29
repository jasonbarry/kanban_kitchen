import React from 'react';
import Column from '../Column/Column';

class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        <Column />
        <Column />
        <Column />
      </div>
    )
  }
}

export default Board;