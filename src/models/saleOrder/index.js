const saleOrderModel = require('./saleOrders');
const insertOrderProduct = require('./insertOrderProduct');

const selectAllCurrentOrders = require('./selectAllCurrentOrders');
const selectProductsByOrderId = require('./selectProductsByOrderId');

module.exports = {
  ...saleOrderModel,
  insertOrderProduct,
  selectAllCurrentOrders,
  selectProductsByOrderId,
};
