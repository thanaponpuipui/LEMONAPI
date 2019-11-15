const route = require('express').Router();
const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const getStockCon = require('../controllers/getConPath')('stock');
const getAllStock = require(getStockCon('getAllStock'));
const addIngredient = require(getStockCon('addIngredient'));
const addNewMenu = require(getStockCon('addNewMenu'));
const getAllMenus = require(getStockCon('getAllMenus'));

route.get('/ingredient', authCheck, getAllStock(lemondb));

route.post('/ingredient', authCheck, addIngredient(lemondb));

route.get('/food', authCheck, getAllMenus);

route.post('/food', authCheck, addNewMenu);

module.exports = route;