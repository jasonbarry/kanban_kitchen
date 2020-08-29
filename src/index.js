import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App/App';

import {insert, getAll, remove, updateTitle, updateColumn} from './database/modules/board/queries'
import Board from './models/board';
import Database from './database/database';
window.board = new Board("This is a test title");
window.boardInsert = insert;
window.boardGetAll = getAll;
window.boardRemove = remove;
window.boardUpdateTitle = updateTitle;
window.boardupdateColumn = updateColumn;
window.boardupdateColumn = updateColumn;
window.db = new Database();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
