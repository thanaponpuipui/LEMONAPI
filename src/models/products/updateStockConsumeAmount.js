const db = require('../../config/lemondb');

module.exports = async ({productId, itemId, newAmount}, client=db) => {
  const sql = `
    UPDATE stock_consume
    SET amount = $1
    WHERE product_id = $2 AND item_id = $3
  `;
  const values = [newAmount, productId, itemId];

  try {
    await client.query(sql, values);
  } catch (e) {
    throw e;
  }
}