const Cube = require('../models/Cube');

async function getAll(query) {
    // взима всичките кубове които са вътре
    // lean() e от монгуса, не връща целия Монго документ клас, обръща го в стандартен JS document
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
    // намиря куб по id 
    return Cube.findById(id).lean();
    
}

// създаване на куб (продукта)
// създаване на нов КУБ от постзаявката CREATE

function create(data) {
    let cube = new Cube(data);

    // ретърнва промис
    return cube.save();

};

module.exports = {
    getAll,
    getOne,
    create,
}

