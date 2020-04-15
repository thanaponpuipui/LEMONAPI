const { Products } = require('../../models/products')

module.exports = async (req, res, next) => {
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