import { hashCode } from "../utils/helper";


export default class Board {

    /**
     * 
     * @param {title of the board} title 
     * @param {columns in that board} columns 
     */
    constructor(title, columns){
        this.id = hashCode(title);
        this.title = title;
        this.columns = columns;
        this.createdAt = new Date().getTime();
        this.updatedAt = new Date().getTime();
    }
}