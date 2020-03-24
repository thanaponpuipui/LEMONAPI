const route = require('express').Router();
const authCheck = require('../middlewares/authorization');

const { addNewOrder, getAllCurrentOrders } = require('../controllers/orderControllers');

route.post('/', authCheck, addNewOrder);

route.get('/all', authCheck, getAllCurrentOrders);

module.exports = route;
