import StellarEntity from './stellarEntity.js';

export default class Planet extends StellarEntity {

    constructor(size, type) {
        super();
        this.size = size;
        this.type = type;
    }

}