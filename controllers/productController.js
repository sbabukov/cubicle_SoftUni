const { Router } = require('express');
const router = Router();
const productService = require('../services/productService')

// импортване на валидиращата функция (name export/import)
const { validateProduct } = require('./helpers/productHelpers')


router.get('/', (req, res) => {
console.log(req.query);

    // на home контролера трябва да му подадем продуктите от productService
    //getAll(req.query) връща каквото има в куери стринга, ако няма нищо ще върне всички продукти
    let products = productService.getAll(req.query);

    res.render('home', { title: 'Browse', products })

    // втори вариант
    // res.render('home', {title: 'home'})

});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' })
});

// middleware - validateProduct за валидиране на инпута се подава като втори параметър
router.post('/create', validateProduct, (req, res) => {
    // console.log(req.body);
    // трябва да се валидират входните данни на клиента от инпута

    // това е ерор callback който се подава и на create function и fs в продукт сървиз
    // разрешаване на асинхронни операции с колбеци, разрешава проблема от забавянето на отговора на сървъра без промиси - с колбек
    
    // productService.create(req.body, (err) => {

    //     if (err) {
    //         return res.status(500).end();
    //     }
    //     res.redirect('/products')
    // });

    // сега правим вариант с промис
    productService.create(req.body)
    .then(() => res.redirect('/products'))
    .catch(() => res.status(500).end())
});

router.get('/details/:productId', (req, res) => {

    // console.log(req.params.productId);

    // дефиниране на продуктът - кубче според id-то
    let product = productService.getOne(req.params.productId)

    // тук се подава product (името product се използва в дитейлс темплейта, и там трябва да product.нещо си) за да може да се рендерира като детайлс и темплейтът дитейлс да го разбере
    res.render('details', { title: 'Product Details', product })
});








module.exports = router;