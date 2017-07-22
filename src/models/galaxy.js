import Star from './star.js';

export default class Galaxy {

    constructor(numEntities) {
        this.size = numEntities;
        this.entities = this.generateEntities(numEntities);
    }

    static generateEntities(numEntities) {
        let entities = [];
        for (let i = 0; i < numEntities; i++) {
            entities.push(new Star());
        }
        return entities;
    }
}