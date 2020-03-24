const route = require('express').Router();

const authCheck = require('../middlewares/authorization');

const { addNewItem, getAllItem } = require('../controllers/stockControllers');

route.post('/', authCheck, addNewItem);

route.get('/', authCheck, getAllItem)

module.exports = route;
