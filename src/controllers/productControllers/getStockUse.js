const { selectStockConsumeByProductId } = require('../../models/products');

module.exports = async (req, res, next) => {
  const productId = req.params.productId;
  
  try {
    const itemList = await selectStockConsumeByProductId({productId});
    const response = {
      flag: 'success',
      message: 'get ingredient',
      data: itemList,
    }
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
}