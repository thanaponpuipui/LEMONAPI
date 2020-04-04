const db = require('../../database/lemondb');

module.exports = async ({productId}, client=db) => {
  const sql = `
    SELECT
      a.item_id,
      a.item_name,
      a.unit,
      b.amount
    FROM stock_items a
    JOIN stock_consume b
    ON a.item_id = b.item_id
    WHERE b.product_id = $1
  `;

  const values = [productId];

  try {
    const { rows } = await client.query(sql, values);
    return rows.map(item => {
      const {
        item_id: id,
        item_name: name,
        unit,
        amount,
      } = item;
      return {id, name, unit, amount}
    })
  } catch (e) {
    throw e;
  }
}