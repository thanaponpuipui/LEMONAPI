const router = require('express').Router();

const {
  addNewProduct,
  getAllProducts,
} = require('../controllers/productControllers');

const authCheck = require('../middlewares/authorization');

router.post('/add', authCheck, addNewProduct);

router.get('/', authCheck, getAllProducts);

module.exports = router;