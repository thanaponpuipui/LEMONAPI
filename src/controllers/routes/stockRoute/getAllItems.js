const { selectBranchStocks } = require('../../../models/stock');

const getAllStock = async (req, res, next) => {
  const { branchId } = req.query;

  try {
    const stockItems = await selectBranchStocks({branchId});
    const message = stockItems.length <= 0 ? 'no stock found!' : `successfully get:${stockItems.length} items`;

    const resData = {
      flag: 'success',
      message: message,
      data: stockItems,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = getAllStock;
