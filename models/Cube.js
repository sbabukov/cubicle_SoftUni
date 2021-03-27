const Model = require('./Model');

// create Cube model

class Cube extends Model {
    constructor(id, name, description, imageUrl, level) {
        super()

        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }


};

module.exports = Cube;