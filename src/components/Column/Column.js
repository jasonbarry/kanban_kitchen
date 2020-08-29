import React from 'react';
import Card from '../Card/Card';
import './Column.css';

class Column extends React.Component {
  render() {
    return(
      <div className="Column">
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default Column