
const Accessory = require('../models/Accessory');

function getAll() {
    // вземаме всички аксесоари
  return Accessory.find().lean(); 
};

function create(data) {
    let accessory = new Accessory (data);

    // новото аксесори го сейваме и връщаме
    // връщаме промис
    return accessory.save()
};


module.exports = {
    create,
    getAll,
};