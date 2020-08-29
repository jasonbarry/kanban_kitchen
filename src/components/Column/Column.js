import React from 'react';
import Card from '../Card/Card';

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