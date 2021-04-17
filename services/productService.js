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

};

function getOneWithAccessories(id) {
    //  да вземе куба със съответните му аксесоари (сигурно за това е populate('accessories')) 
    // populate('accessories') става в монгууз, метод на монгууз е, дай ми този куб и му популирай - запълни му аксесоарите, демек ще върне аксесоарите ('accessories') като масив от обекти - всичко - цялата информация от обекта,  картинки, име и т.н. Всичко това е вързано в модела Cube.js 
    return Cube.findById(id).populate('accessories').lean();
};

// създаване на куб (продукта)
// създаване на нов КУБ от постзаявката CREATE
// подаваме и userId
function create(data, userId) {
    // деструктурираме датата и подаваме също и айдито като userId. Това creator: userId добавя айдито на създателя към базата, идва от модела в Cube.js
    let cube = new Cube({...data, creator: userId});

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

function updateOne(productId, productData) {
    // от https://mongoosejs.com/docs/api/document.html да видим какви ъпдейт заявки има. Document.prototype.updateOne() от документацията
    // трябва да подадем филтрираща логика и какво искаме да ъпдейтваме
    // намери ми куба по id и подай данните които да се променят - productData
    return Cube.updateOne({_id: productId}, productData);
};

function deleteOne(productId) {
    // return-ваме за да си хване промиса
    // от монгуз докумментацията намираме как да изтрием  в Query deleteOne - Query.prototype.deleteOne()
    return Cube.deleteOne({_id: productId})
}

module.exports = {
    getAll,
    getOne,
    getOneWithAccessories,
    create,
    attachAccessory,
    updateOne,
    deleteOne,
};

