import Ship from './ship.js';

export default class User {
    constructor(id) {
        this.id = id;
        this.ship = new Ship();
        this.currentStar = null;
    }
}