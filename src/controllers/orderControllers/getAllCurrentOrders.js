const { selectAllCurrentOrders, selectProductsByOrderId } = require('../../models/saleOrder');
 
module.exports = async (req, res, next) => {
  
  const {branchId} = req.query;

  try {
    const orders = await selectAllCurrentOrders({branchId});

    const promises = orders.map(async order => {
      const products = await selectProductsByOrderId({orderId:order.id});
      return {
        order,
        products,
      }
    })

    const ordersProduct = await Promise.all(promises);
    res.status(200).json(ordersProduct);
  } catch (e) {
    next(e);
  }
}