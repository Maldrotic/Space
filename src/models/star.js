export default class Star extends Entitiy {

    constructor(numEntities, type) {
        super();
        this.entities = this.generateEntities(numEntities);
        this.type = this.randomType();
    }



    get entities() {
        return this.entities;
    }


    // Static methods

    static generateEntities(numEntities) {
        
    }

    static randomType() {
        return Math.random(this.type())
    }

    static type () {
        return {
            O,
            B,
            A,
            F,
            G,
            K,
            M
        };
    }
}