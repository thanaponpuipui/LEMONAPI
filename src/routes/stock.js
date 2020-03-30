const route = require('express').Router();

const authCheck = require('../middlewares/authorization');

const {
  addNewItem,
  getAllItem,
  updateStockAmount,
} = require('../controllers/stockControllers');

route.post('/', authCheck, addNewItem);

route.get('/', authCheck, getAllItem);

route.patch('/updateAmount', authCheck, updateStockAmount);

module.exports = route;
