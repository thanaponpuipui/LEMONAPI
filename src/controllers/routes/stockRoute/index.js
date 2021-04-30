const route = require('express').Router();

const authCheck = require('../../../middlewares/authorization');

const addNewItem = require("./addNewItem");
const getAllItem = require("./getAllItems");
const updateStockAmount = require("./updateStockAmount");

route.post('/', authCheck, addNewItem);

route.get('/', authCheck, getAllItem);

route.patch('/updateAmount', authCheck, updateStockAmount);

module.exports = route;
