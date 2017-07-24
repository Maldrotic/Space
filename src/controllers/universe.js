import Galaxy from '../models/galaxy.js';
import Util from '../helpers/util.js';

export default class Universe {

    constructor(numGalaxies, maxGalaxySize, maxStarSize) {
        this.size = numGalaxies;
        this.galaxies = Universe.generateGalaxies(numGalaxies, maxGalaxySize, maxStarSize);
    }

    static generateGalaxies(numGalaxies, maxGalaxySize, maxStarSize) {
        let galaxies = {};
        for (let i = 0; i < numGalaxies; i++) {
            const numStars = Util.rdmInt(1, maxGalaxySize);
            galaxies[i] = new Galaxy(numStars, maxStarSize);
        }
        return galaxies;
    }
}