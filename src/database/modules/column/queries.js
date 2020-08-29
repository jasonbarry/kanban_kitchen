import { config } from '../../../setup/DBConfig';
import Database from '../../database';
import { addColumn as addColumnToBoard, getOne as getOneBoard } from '../board/queries'

const database = new Database();

// Insert new column
export const insert = (boardId, column, onSuccess, onError) => {
   const res =  database.instance.transaction([config.stores.COLUMNS], "readwrite")
    .objectStore(config.stores.COLUMNS)
    .add(column);

    res.onsuccess = (event) => {
        // Update the board with tha new column
        addColumnToBoard(boardId, column.id, column.position);

        if(onSuccess !== undefined)
            onSuccess(event);
    }

    res.onerror = (event) => {
        if(onError !== undefined)
            onError(event);
    }
}

// Get all columns
export const getAll = (boardId, onSuccess, onError) => {
    // Get Columns that belongs to the boardId
    const res =  getOneBoard(boardId, (result) => {
        // Get all the column ids as array
        console.log(JSON.stringify(result.columns));

        const columnIds =  Object.Keys(result.columns);

        const columns = [];
        let index = 0;

        // Use cursor to get all the column details
        database.instance
        .transaction(config.stores.COLUMNS)
        .objectStore(config.stores.COLUMNS)
        .openCursor().onsuccess = (event) => {

            let cursor = event.target.result;
            if(cursor) {
                columns.splice(index, 0, cursor.value);
                cursor.continue(columnIds[index])
            } else {
                if(onSuccess !== undefined)
                    onSuccess(columns);
            }

        }
    }, (event) => {
        if(onError !== undefined)
            onError(event);
    });
}

// Delete a column
export const remove = (id, onSuccess, onError) => {
    const res =  database.instance.transaction([config.stores.COLUMNS], "readwrite")
    .objectStore(config.stores.COLUMNS)
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
        if(onError !== undefined)
            onError(event);
    }
}

// Delete column form board
export const removeColumn = (boardId, columnId, onSuccess, onError) => {
    const store =  database.instance.transaction([config.stores.BOARDS], "readwrite")
    .objectStore(config.stores.BOARDS);

    const res = store.get(boardId);

    res.onsuccess = (event) => {
        const board = event.target.result;

        if(board.columns !== undefined && columnId in board.columns){
            delete board.columns[columnId]
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