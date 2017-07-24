export default class Ship {
    constructor() {
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.maxInventory = 10;
        this.currentInventory = 0;
        this.maxFuel = 10;
        this.currentFuel = 3;
        this.engineers = 1;
        this.crew = 1
        this.damagePerSecond = 1;
    }
}