import React from 'react';
import './Card.css';

class Card extends React.Component {
  render() {
    return(
      <div className="Card">
        <h1>Title</h1>
        <p>description</p>
      </div>
    )
  }
}

export default Card;