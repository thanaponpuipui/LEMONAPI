const router = require('express').Router();

const { addNewProduct, getAllProducts, getStockUse } = require('../controllers/productControllers');

const authCheck = require('../middlewares/authorization');

router.post('/add', authCheck, addNewProduct);

router.get('/', authCheck, getAllProducts);

router.get('/stock-use/:productId', authCheck, getStockUse);

module.exports = router;
