const db = require('../../database/lemondb');
const { insertOrderProduct, insertSaleOrder } = require('../../models/saleOrder');

const addNewOrder = async (req, res, next) => {
  try {
    const { branchId, products, orderType } = req.body;
    //validation here

    const client = await db.connect();
    try {
      const orderId = await insertSaleOrder({ branchId, orderType }, client);
      const promises = [];
      products.forEach(product => {
        const { amount, productId } = product;
        const process = insertOrderProduct({ orderId, productId, amount }, client);
        promises.push(process);
      });
      await Promise.all(promises);
    } catch (trxErr) {
      try {
        await client.query('ROLLBACK');
      } catch (er) {
        throw er;
      }
      throw trxErr;
    } finally {
      client.release();
    }
    const resData = {
      flag: 'success',
      message: 'successfully add new order!',
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = addNewOrder;
