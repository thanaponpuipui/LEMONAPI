const db = require('../../database/lemondb');
const time = require('../../utils/time');

module.exports.checkout = async ({ orderId }, client = db) => {
  const current = time.now();
  const sql = `UPDATE sale_orders
                SET closed_time = $1
                WHERE order_id = $2
                RETURNING ordered_time, closed_time, order_type`;
  const values = [current, orderId];
  try {
    const { rows } = await client.query(sql, values);

    const { add_time, checked_time, order_type } = rows[0];
    const checkedItem = {
      orderedTime: add_time,
      closedTime: checked_time,
      orderType: order_type,
    };
    return checkedItem;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports.insertSaleOrder = async ({ branchId, orderType }, client = db) => {
  const sql = `
  INSERT INTO sale_orders(
    branch_id,
    order_type,
    ordered_time
  )
  VALUES(
    $1,
    $2,
    DEFAULT
  )
  RETURNING order_id
  `;
  const values = [branchId, orderType || null];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].order_id;
  } catch (e) {
    throw e;
  }
};
