const { Router } = require('express');
const productService = require('../services/productService')
const accessoryService = require('../services/accessoryService');
const router = Router();

// импортване на валидиращата функция (name export/import)
const { validateProduct } = require('./helpers/productHelpers')


router.get('/', (req, res) => {
    // тук извикваме сървиз, който да направи заявката
    productService.getAll(req.query)
        .then(products => {
            // console.log(products);
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end())

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

router.get('/details/:productId', async (req, res) => {

    // дефиниране на продуктът - кубче според id-то
    // трябва да го ауейтнем
    let product = await productService.getOne(req.params.productId)


    // тук се подава product (името product се използва в дитейлс темплейта, и там трябва да product.нещо си) за да може да се рендерира като детайлс и темплейтът дитейлс да го разбере
    res.render('details', { title: 'Product Details', product })
});


router.get('/:productId/attach', async (req, res) => {
    // console.log('Hello');
    // от продуктсървиса чрез гетуон и продукт айдито,  взимам продукта
    let product = await productService.getOne(req.params.productId)

    // взимаме всички аксесоари
    let accessories = await accessoryService.getAll();

    // console.log(accessories);

    // рендва хендълсбара attachAccessory.hbs , подаваме продукта и всичките му аксесоари
    res.render('attachAccessory', { product, accessories })
});

router.post('/:productId/attach', (req, res) => {
    // закачаме аксесоар към съответен продукт
    // закачаме кое е id и какво искаме да му закачим - аксесоар
    productService.attachAccessory(req.params.productId, req.body.accessory)
        // ще ни редиректне към страницата с атачнатите аксесоари

        .then(() => res.redirect(`/products/details/${req.params.productId}`));

    // console.log(req.body);
});





module.exports = router;