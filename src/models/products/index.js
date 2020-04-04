const productsModel = require('./products');
const insertStockConsume = require('./insertStockConsume');
const selectStockConsumeByProductId = require('./selectStockConsumeByProductId');
const updateStockConsumeAmount = require('./updateStockConsumeAmount');

module.exports = {
  ...productsModel,
  selectStockConsumeByProductId,
  insertStockConsume,
  updateStockConsumeAmount,
};
