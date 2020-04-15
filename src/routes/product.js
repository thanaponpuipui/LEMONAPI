const router = require('express').Router();

const {
  addNewProduct,
  getAllProducts, 
  getStockUse,
  changeStockUseAmount,
  deleteProduct,
  configProductInfo,
} = require('../controllers/productControllers');

const authCheck = require('../middlewares/authorization');

router.post('/add', authCheck, addNewProduct);

router.get('/', authCheck, getAllProducts);

router.get('/stock-use/:productId', authCheck, getStockUse);

router.patch('/amount', authCheck, changeStockUseAmount);

router.put('/:productId', authCheck, configProductInfo);

router.delete('/:productId', authCheck, deleteProduct);

module.exports = router;
