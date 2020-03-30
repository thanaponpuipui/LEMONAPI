const stockItemModel = require('./stockItem');
const insertStockUpdateHistory = require('./insertStockUpdateHistory');

module.exports = {
  ...stockItemModel,
  insertStockUpdateHistory,
};
