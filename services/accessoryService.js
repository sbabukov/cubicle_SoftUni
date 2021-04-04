
const Accessory = require('../models/Accessory');

function getAll() {
    // вземаме всички аксесоари
  return Accessory.find().lean(); 
};

function getAllUnattached(ids) {
    //   $nin/in е mongoDB operators (Matches none of the values specified in an array.)
    // намери ми тези аксесоари на които id им е нот ин {$nin: []} в тези стойности
    // търсим тези аксесоари, на които id  им не е измежду тези id  [ids] - масив от стойности, които ние подаваме 
    // ще ни върне всички тези, които не са измежду тези стойности
    // ако видим тази грешка: Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent. Значи трябва да се сложи .lean() накрая
    return Accessory.find({_id: {$nin: ids} }).lean();
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
    getAllUnattached,
};