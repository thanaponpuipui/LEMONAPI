const {
  getAllCurrentOrder: getOrder,
} = require('../../models/orderTransaction/getCurrentOrder.trx');

module.exports = getAllCurrentOrder = async (req, res, next) => {
  const restId = req.query.restId;
  /* const sql = {
        text: 'SELECT * FROM sale_order WHERE rest_id = $1 AND checked_time IS NULL AND order_type = $2',
        values: [restId, 'TAKE AWAY'],
    } */
  try {
    /* const { rows } = db.query(sql);
        const resData = rows.map(row => {
            const { sale_id, addTime, orderType } = row;
            
        }) */
    const orders = await getOrder(restId);
    const resData = {
      message: 'success',
      orders,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};
