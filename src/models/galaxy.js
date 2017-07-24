import StellarEntity from './stellarEntity.js';
import Star from './star.js';
import Util from '../helpers/util.js';

export default class Galaxy extends StellarEntity {

    constructor(numStars, maxStarSize) {
        super();
        this.size = numStars;
        this.stars = Galaxy.generateStars(numStars, maxStarSize);
    }

    toHTMLString() {
        return '<p class="galaxy-text">'+this.id+'</p>';
    }

    static generateStars(numStars, maxStarSize) {
        let stars = {};
        for (let i = 0; i < numStars; i++) {
            let starSize = Util.rdmInt(1, maxStarSize);
            let star = new Star(starSize);
            stars[star.id] = star;
        }
        return stars;
    }
}