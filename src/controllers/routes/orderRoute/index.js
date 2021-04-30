const route = require('express').Router();
const authCheck = require('../../../middlewares/authorization');

const addNewOrder = require("./addNewOrder")
const getAllCurrentOrders = require("./getAllCurrentOrders")

route.post('/', authCheck, addNewOrder);

route.get('/all', authCheck, getAllCurrentOrders);

module.exports = route;
