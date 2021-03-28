const mongoose = require('mongoose');

// const Model = require('./Model');

// class Accessory extends Model {


// };

const accessoryScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    imageUrl: String,
    description: String,
})

module.export = mongoose.model('Accessory', accessoryScheme);