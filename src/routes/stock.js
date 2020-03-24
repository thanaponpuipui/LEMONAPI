const route = require('express').Router();

const authCheck = require('../middlewares/authorization');

const getStockCon = require('../controllers/getConPath')('stock');
const addNewStock = require(getStockCon('addNewItem'));

route.post('/', authCheck, addNewStock);

module.exports = route;
