const db = require('../../database/lemondb');

module.exports = async ({orderId, productId, amount}, client=db) => {
  const sql = `
    INSERT INTO order_product (
      order_id,
      product_id,
      amount,
      delivered_amount
    )
    VALUES (
      $1,
      $2,
      $3,
      DEFAULT
    )
  `;
  const values = [orderId, productId, amount];
  try {
    await client.query(sql, values);
    return ;
  } catch (e) {
    throw e;
  }
}