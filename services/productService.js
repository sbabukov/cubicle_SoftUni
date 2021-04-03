const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    // взима всичките кубове които са вътре
    // lean() e от монгуса, не връща целия Монго документ клас, обръща го в лийн масив със стандартни JS обекти
    // дай ми всички кубове и ми ги върни в лийн вариант (чисти JS objects)
    let products = await Cube.find({}).lean();

    // console.log(products);

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        products = products.filter(x => Number(x.level) >= query.from)
    }

    if (query.to) {
        products = products.filter(x => Number(x.level) <= query.to)
    }
    return products;
}

// функцията намира куб според неговото id , и връща куба
// вече трябва да я направим асинхронна
 function getOne(id) {
    // намиря куб по id, и ми го върни в лийн вариант 
    return Cube.findById(id).lean();
    
}

// създаване на куб (продукта)
// създаване на нов КУБ от постзаявката CREATE

function create(data) {
    let cube = new Cube(data);

    // ретърнва промис
    return cube.save();

};

async function attachAccessory(productId, accessoryId) {
    // от базата данни взимаме съществуващия куб, пращаме id и базата по него ни връща обекта
    let product = await Cube.findById(productId);
    // вземаме и аксесоара от базата
    let accessory = await Accessory.findById(accessoryId);

    // console.log(product); 
    // console.log(accessory); 

    // трябва да асоциираме куба и аксесоара - accessories идва от модела Cube.js
    product.accessories.push(accessory);
    // и после се сейва
    // ретърнва се за да се резолвне промиса
    return product.save();
};

module.exports = {
    getAll,
    getOne,
    create,
    attachAccessory,
}

