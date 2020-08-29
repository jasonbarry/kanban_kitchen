

export default class Column {
    /**
     * 
     * @param {title of the column} title 
     * @param {position of the column} position 
     * @param {cards column is holding} cards 
     */
    constructor(title, position, cards) {
        this.title = title;
        this.position = position;
        this.cards = cards;
    }
}