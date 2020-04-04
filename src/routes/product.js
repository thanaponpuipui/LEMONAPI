const router = require('express').Router();

const { addNewProduct, getAllProducts, getStockUse, changeStockUseAmount } = require('../controllers/productControllers');

const authCheck = require('../middlewares/authorization');

router.post('/add', authCheck, addNewProduct);

router.get('/', authCheck, getAllProducts);

router.get('/stock-use/:productId', authCheck, getStockUse);

router.patch('/amount', authCheck, changeStockUseAmount);

module.exports = router;
