import React from 'react';
import Column from '../Column/Column';
import './Board.css';

class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        <ul className="scroll">
          <li><Column /></li>
          <li><Column /></li>
          <li><Column /></li>
          <li><Column /></li>
          <li><Column /></li>
          <li><Column /></li>
        </ul>
      </div>
    )
  }
}

export default Board;