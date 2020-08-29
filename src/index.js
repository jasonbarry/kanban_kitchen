import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App/App';

import {insert, getAll, remove, updateTitle, addColumn, removeColumn} from './database/modules/board/queries'
import {insert as columnInsert, getAll as columnGetAll} from './database/modules/column/queries'
import Board from './models/board';
import Column from './models/column'
import Database from './database/database';
window.board = new Board("This is a new board title");
window.column = Column;
window.boardInsert = insert;
window.boardGetAll = getAll;
window.boardRemove = remove;
window.boardUpdateTitle = updateTitle;
window.boardAddColumn = addColumn;
window.boardRemoveColumn = removeColumn;
window.columnInsert = columnInsert
window.columnGetAll = columnGetAll
window.db = new Database();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
