const Cube = require('../models/Cube');
const productData = require('../data/productData')

// правим филтрация по куери стринга
function getAll(query) {

    // productsData.getAll()  взима продуктите от базата
    let products = productData.getAll();

    // понеже е статичен метода getAll, се извиква директно върху класа Cube, получават всичките продукти от productsDb
    // let products = Cube.getAll();

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
function getOne(id) {
    return productData.getOne(id);

    // return Cube.getOne(id);
}

// създаване на куб (продукта)
// създаване на нов КУБ от постзаявката CREATE

function create(data) {
    let cube = new Cube(data);


    // path библиотеката джойнва двата пътя - първия от абсолютният път до директорията в която се намираме и вторият: релативно да се върнем назад към пътеката на json файла
    // console.log(path.join(__dirname, '../config/products.json'));


    // запазване на данните за куба в products.json
    // трябва да се подаде абсолютен път с __dirname +  от текущата папка се върни едно нагоре и влезни в папка конфиг
    
    // закоментирано е варианта с колбека, по-долу е с промис
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(productsData),
    //     callback
    // );

    // връща промис
    // return productData.create(cube)

    // ретърнва промис
    return cube.save();

};

module.exports = {
    getAll,
    getOne,
    create,
}

