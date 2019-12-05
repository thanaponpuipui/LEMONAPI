const route = require('express').Router();
const authCheck = require('../middlewares/authorization');
const getOrderCon = require('../controllers/getConPath')('order');

const addNewOrder = require(getOrderCon('addNewOrder'));
const getAllCurrentOrder = require(getOrderCon('getAllCurrentOrder'));
const orderCheckout = require(getOrderCon('orderCheckout'));

route.post('/', authCheck, addNewOrder);

route.get('/', authCheck, getAllCurrentOrder);

route.patch('/:id', authCheck, orderCheckout);

module.exports = route;
