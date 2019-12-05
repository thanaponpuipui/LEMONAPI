const { newOrder } = require('../../models/orderTransaction/newOrder.trx');
//const { addOrderValidation } = require('../../validation/tempValidate');
/*
 * @ typeDef {pool Object from pg database postgresql driver} databasePool
 * @ param {databasePool} db
 */
const addNewOrder = async (req, res, next) => {
  try {
    const { restId, items, orderType } = req.body;
    //validation here
    const orderDetail = {
      orderType,
      items,
    };
    await newOrder(orderDetail, restId);
    const resData = {
      message: 'successfully add new order!',
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = addNewOrder;
