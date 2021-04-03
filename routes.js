
// конфигуриране на раутерите
const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');

const router = Router();

router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.use('*', (req, res) => {
    res.render('404')
});



    module.exports = router;
    