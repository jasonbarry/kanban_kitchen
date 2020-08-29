import React from 'react';
import Header from '../Header/Header';
import Board from '../Board/Board';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      </div>
    )
  }
}

export default App;
