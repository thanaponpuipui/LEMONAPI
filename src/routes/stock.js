const route = require('express').Router();
const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const getStockCon = require('../controllers/getConPath')('stock');
const getAllStock = require(getStockCon('getAllStock'));
const addIngredient = require(getStockCon('addIngredient'));

route.get('/', authCheck, getAllStock(lemondb));

route.post('/', authCheck, addIngredient(lemondb));

module.exports = route;