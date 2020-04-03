const productsModel = require('./products');
const insertStockConsume = require('./insertStockConsume');
const selectStockConsumeByProductId = require('./selectStockConsumeByProductId');

module.exports = {
  ...productsModel,
  selectStockConsumeByProductId,
  insertStockConsume,
};
