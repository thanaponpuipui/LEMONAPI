const router = require('express').Router();

const authCheck = require('../../middlewares/authorization');

const getAllProducts = require("./getAllProducts");
const addNewProduct =require("./addNewProduct");
const getStockUse = require("./getStockUse");
const changeStockUseAmount = require("./changeStockUseAmount");
const deleteProduct = require("./deleteProduct");
const configProductInfo = require("./configProductInfo");

router.post('/add', authCheck, addNewProduct);

router.get('/', authCheck, getAllProducts);

router.get('/stock-use/:productId', authCheck, getStockUse);

router.patch('/amount', authCheck, changeStockUseAmount);

router.put('/:productId', authCheck, configProductInfo);

router.delete('/:productId', authCheck, deleteProduct);

module.exports = router;
