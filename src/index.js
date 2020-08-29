import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App/App';

import Databse from './database/database'
import {insert, getAll} from './database/modules/board/queries'
import Board from './models/board';
import Database from './database/database';
window.board = new Board("This is a test title");
window.boardInsert = insert;
window.boardGetAll = getAll;
window.db = new Database();
debugger
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
