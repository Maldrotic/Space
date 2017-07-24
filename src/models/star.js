import StellarEntity from './stellarEntity.js';
import Util from '../helpers/util.js';
import Planet from './planet.js';

export default class Star extends StellarEntity {

    constructor(numEntities) {
        super();
        this.numEntities = numEntities;
        this.entities = Star.generateEntities(numEntities);
        this.jEntities = 0;
        this.eEntities = 0;
        this.xEntities = 0;
        this.users = [];

        for (let i = 0; i < this.entities.length; i++) {
            let entityType = this.entities[i].type;
            if (entityType === 'J') {
                this.jEntities++;
            } else if (entityType === 'E') {
                this.eEntities++;
            } else {
                this.xEntities++;
            }
        }
        const idPart = this.id;
        const jPart = this.jEntities>0 ? 'J'+this.jEntities : '';
        const ePart = this.eEntities>0 ? 'E'+this.eEntities : '';
        const xPart = this.xEntities>0 ? 'X'+this.xEntities : '';
        this.id = idPart+jPart+ePart+xPart;
    }

    get size() {
        return this.numEntities;
    }

    addUser(userId) {
        let indexOfUser = this.users.indexOf(userId);
        if (indexOfUser < 0) {
            this.users.push(user);
        }
        return indexOfUser < 0;
    }

    removeUser(userId) {
        let indexOfUser = this.users.indexOf(userId);
        if (indexOfUser >= 0) {
            this.users.splice(indexOfUser, 1);
        }
        return indexOfUser >= 0;
    }

    // Static methods
    static generateEntities(numEntities) {
        let entities = [];
        for (let i = 0; i < numEntities; i++) {
            let type = null;
            let typeInt = Util.rdmInt(1, 100);
            if (typeInt <= 10) {
                type = 'X';
            } else if (typeInt <= 50) {
                type = 'E';
            } else {
                type = 'J';
            }
            let entity = new Planet(10, type);
            entities.push(entity);            
        }
        return entities;
    }
}