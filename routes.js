
// конфигуриране на раутерите
const { Router } = require('express');

const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

// на ниво контролери можем да ограничаваме къде да се ходи.
router.use('/', homeController);
// логнат потребител няма да може да продължи на раут започващ с '/auth' демек да отваря логин и регистер пейджа
// router.use('/auth', isGuest, authController);

router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.use('*', (req, res) => {
    res.render('404')
});



    module.exports = router;
    