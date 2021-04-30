const { Products } = require('../../../models/products')

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Products.deleteProduct({productId});
    const response = {
      flag: 'success',
      message: 'Product deleted'
    }
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
}
module.exports = deleteProduct;