let _id = 0;

export default class StellarEntity {

    constructor() {
        this.id = StellarEntity.getId();
    }

    static getId() {
        _id++;
        return _id;
    }

}