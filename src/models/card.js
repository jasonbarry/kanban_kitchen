import { hashCode } from "../utils/helper";


export default class Card {

    /**
     * 
     * @param {column id to which the card belongs} columnId 
     * @param {titlt of the card} title 
     * @param {description of the card} description 
     * @param {array of all the images attached} images 
     * @param {position of the card in the column} position 
     */
    constructor(columnId, title, description, images, position){
        this.id = hashCode(title);
        this.columnId = columnId;
        this.title = title;
        this.description = description;
        this.images = images;
        this.position = position;
        this.createdAt = new Date().getTime();
        this.updatedAt = new Date().getTime();
    }
}