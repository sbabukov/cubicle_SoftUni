
const Accessory = require('../models/Accessory');

function create(data) {
    let accessory = new Accessory (data);

    // новото аксесори го сейваме и връщаме
    // връщаме промис
    return accessory.save()
};


module.exports = {
    create,
};