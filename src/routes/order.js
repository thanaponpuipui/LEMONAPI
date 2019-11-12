const route = require('express').Router();
const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const getOrderCon = require('../controllers/getConPath')('order');

const addNewOrder = require(getOrderCon('addNewOrder'));

route.post('/', authCheck, addNewOrder(lemondb));

module.exports = route;