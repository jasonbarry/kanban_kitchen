import React from 'react';
import Header from '../Header/Header';
import Board from '../Board/Board';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Board />
      </div>
    )
  }
}

export default App;
