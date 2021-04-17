// в продуктКонтролера се рендерират хендълбарс темплейтите от папка view

const { Router } = require('express');

// това са мидълуери, които проверяват дали си логнат потребител, или гост - isAuthenticated/isGuest
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

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

// заради isAuthenticated  тук router.get('/create', isAuthenticated, (req, res) - няма да може да отиде нелогнат потребител
// на раута '/create' няма да може да отиде нелогнат потребител
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' })
});

// middleware - validateProduct за валидиране на инпута се подава като втори параметър
// първо ще провери дали е isAuthenticated и после ще провери validateProduct
// може да си слагаме няколко мидълуери
router.post('/create', isAuthenticated, validateProduct, (req, res) => {
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
    // пращаме данните от формата с req.body, също и данните за юзера с req.user (интересува ни айдито)
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req, res) => {

    // дефиниране на продуктът - кубче според id-то
    // трябва да го ауейтнем
    let product = await productService.getOneWithAccessories(req.params.productId);


    // тук се подава product (името product се използва в дитейлс темплейта, и там трябва да product.нещо си) за да може да се рендерира като детайлс и темплейтът дитейлс да го разбере
    res.render('details', { title: 'Product Details', product })
});


router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    // console.log('Hello');
    // от продуктсървиса чрез функцията getOne и productId,  взимам продукта
    let product = await productService.getOne(req.params.productId);

    // console.log(product.accessories);

    // взимаме всички аксесоари
    let accessories = await accessoryService.getAllUnattached(product.accessories);
    // console.log(accessories);




    // console.log(accessories);

    // рендва хендълсбара attachAccessory.hbs , подаваме продукта и всичките му аксесоари
    res.render('attachAccessory', { product, accessories })
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    // закачаме аксесоар към съответен продукт
    // закачаме кое е id и какво искаме да му закачим - аксесоар
    productService.attachAccessory(req.params.productId, req.body.accessory)
        // ще ни редиректне към страницата с атачнатите аксесоари

        .then(() => res.redirect(`/products/details/${req.params.productId}`));

    // console.log(req.body);
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    // трябва да вземем от ДБ съответния куб и да го подадем в editCube.hbs защото искаме да го едитваме
    // взимамего от самия раут който идва. В ПродукСървиса се грижи за взимането на кубовете
    // тавя req.params.productId идва от раута
    productService.getOne(req.params.productId)
        .then(product => {
            // рендерира се като се подава product (ДБ е върнала целия обект продукт с всичките му пропъртита ) като втори параметър долу
            res.render('editCube', product);

        });

});

router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    // получаваме целия обект req.body от формата 
    // console.log(req.body);

    // трябва да ъпдейтнем, id(взима се като req.params.productId защото се взима от раута) на което трябва да ъпдейтнем и data, която трябва да се ъпдейтне 
    // функцията updateOne е от productService
    // трябва да се минава през валидация, в случая самия модел ни валидира данните
    productService.updateOne(req.params.productId, req.body)
        .then(responce => {
            // редиректва в случай, ъпдейта е минал успешно
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(error => {
            // тук може да го редиректнем някъде другаде ако има грешка
        });

});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    // намери съответния куб, и после го рендерирай
    productService.getOne(req.params.productId)
        .then(product => {
            // рендерира се като се подава product (ДБ е върнала целия обект продукт с всичките му пропъртита ) като втори параметър долу

            // проверка само който е криетър на куба да може да го трие
            // трябва да проверим дали нашия юзер е криейтъра
            if (req.user._id != product.creator) {
                res.redirect('/products');

            } else {

                res.render('deleteCube', product);
            }

        });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    // подаваме на deleteOne какво да се изтрие

    // req.params.productId това идва от раута
    productService.deleteOne(req.params.productId)
        // тук проверяваме дали нашия юзер е криейтъра
        .then(product => {
            if (product._id !== req.user._id) {
                // редиректваме без нищо да се трие
                return res.redirect('/products')
            }

            return productService.deleteOne(req.params.productId)
                // и съответно когато го изтриеш да редиректне към началната страница продуктс
                
            })
            // чак като е изтрито редиректваме
            .then(response => res.redirect('/products'))


});



module.exports = router;