const { updateStockConsumeAmount } = require('../../../models/products');

const changeStockUseAmount = async (req, res, next) => {
  const { newAmount, productId, itemId } = req.body;
  try {
    await updateStockConsumeAmount({newAmount, productId, itemId});
    const resData = {
      flag: 'success',
      message: 'update stock use'
    }
    res.status(200).json(resData)
  } catch (e) {
    next(e);
  }
}

module.exports = changeStockUseAmount;