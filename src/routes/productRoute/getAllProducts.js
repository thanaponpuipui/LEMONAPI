const { selectAllBranchProducts } = require('../../models/branches');

const getAllProducts = async (req, res, next) => {
  try {
    const { branchId } = req.query;

    const products = await selectAllBranchProducts({ branchId });

    const resData = {
      flag: 'success',
      message: 'get all menu',
      data: products,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = getAllProducts;