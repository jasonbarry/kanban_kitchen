import Database from '../../database';
import { config } from '../../../setup/DBConfig';


export const insert = (db, board, onSuccess, onError) => {
   const res =  db.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .add(board);

    res.onsuccess = (event) => {
        onSuccess(event.traget.result);
    }

    res.onerror = (event) => {
        onError(event);
    }
}

export const getAll = (db, onSuccess, onError) => {
    const res =  db.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .getAll();

    res.onsuccess = (event) => {
        onSuccess(event.target.result);
    }

    res.onerror = (event) => {
        onError(event);
    }
}