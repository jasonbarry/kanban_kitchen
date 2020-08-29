import { config } from '../../../setup/DBConfig';
import Database from '../../database';

const database = new Database();

// Insert new board
export const insert = (board, onSuccess, onError) => {
   const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .add(board);

    res.onsuccess = (event) => {
        if(onSuccess !== undefined)
            onSuccess(event);
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Get one board
export const getOne = (boardId, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        if(onSuccess !== undefined)
            onSuccess(event.target.result);
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Get all boards
export const getAll = (onSuccess, onError) => {
    const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .getAll();

    res.onsuccess = (event) => {
        if(onSuccess !== undefined)
            onSuccess(event.target.result)    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Delete a board
export const remove = (id, onSuccess, onError) => {
    const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .delete(id);

    res.onsuccess = (event) => {
        if(onSuccess !== undefined)
            onSuccess(event)
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Update board title
export const updateTitle = (id, title, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)

    const res = store.get(id);

    res.onsuccess = (event) => {
        const board = event.target.result;
        board.title = title;
        update(store, board, onSuccess, onError);
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Board update private helper method
const update = (store, board, onSuccess, onError) => {

    const res = store.put(board);

    res.onsuccess = (event) => {
        if(onSuccess !== undefined)
            onSuccess(event)
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Update column in board 
export const addColumn = (boardId, columnId, position, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS);

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        const board = event.target.result;

        if(board.columns === undefined){
            board.columns = [];
        }

        board.columns.splice(position, 0, columnId);
        update(store, board, onSuccess, onError);
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Delete column form board
export const removeColumn = (boardId, position, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS);

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        const board = event.target.result;

        if(board.columns !== undefined){
            board.columns.splice(position, 1);
            update(store, board, onSuccess, onError);
        } else {
            if(onSuccess !== undefined)
                onSuccess(event)
        } 
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}