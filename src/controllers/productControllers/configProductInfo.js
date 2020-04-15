const { Products } = require('../../models/products')

module.exports = async (req, res, next) => {
  const productId = req.params.productId;
  const { name, price, description, image } = req.body;
  try {
    const product = await Products.updateProduct(productId, {name, price, description, image});
    const response = {
      flag: 'success',
      message: 'update product complete.',
      data: product,
    }
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
}