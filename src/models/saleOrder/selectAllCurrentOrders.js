const db = require('../../database/lemondb');

module.exports = async ({branchId}, client=db) => {
  const sql = `
    SELECT
      order_id,
      order_type,
      ordered_time,
    FROM sale_orders
    WHERE closed_time IS NULL and branch_id = $1
    ORDER BY ordered_time
  `
  const values = [branchId];
  try {
    const { rows } = await client.query(sql, values);
    const orders = [];
    rows.forEach(row => {
      const order = {
        id: row.order_id,
        type: row.order_type,
        orderedTime: row.ordered_time,
      }
      orders.push(order);
    })
    return orders;
  } catch (e) {
    throw e;
  }
}