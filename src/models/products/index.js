const productsModel = require('./products');
const insertStockConsume = require('./insertStockConsume');
module.exports.insertStockConsume = insertStockConsume;
module.exports = { ...productsModel };
