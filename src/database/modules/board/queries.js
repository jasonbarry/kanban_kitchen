import { config } from '../../../setup/DBConfig';
import Database from '../../database';

const database = new Database();

export const insert = (board, onSuccess, onError) => {
   const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .add(board);

    res.onsuccess = (event) => {
        onSuccess(event);
    }

    res.onerror = (event) => {
        onError(event);
    }
}

export const getAll = (onSuccess, onError) => {
    const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .getAll();

    res.onsuccess = (event) => {
        onSuccess(event.target.result   );
    }

    res.onerror = (event) => {
        onError(event);
    }
}

export const remove = (id, onSuccess, onError) => {
    const res =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS)
    .delete(id);

    res.onsuccess = (event) => {
        onSuccess(event);
    }

    res.onerror = (event) => {
        onError(event);
    }
}

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
        onError(event);
    }
}

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

export const updateColumn = (boardId, columnId, position, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS);

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        const board = event.target.result;

        if(board.columns === undefined){
            board.columns = {};
        }

        board.columns[columnId] = position;
        update(store, board, onSuccess, onError);
    }

    res.onerror = (event) => {
        onError(event);
    }
}

export const removeColumn = (boardId, columnId, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS);

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        const board = event.target.result;

        if(board.columns !== undefined && board.columns[columnId]){
            delete board.columns[columnId]
            update(store, board, onSuccess, onError);
        } else {
            onSuccess(event);
        } 
    }

    res.onerror = (event) => {
        onError(event);
    }
}