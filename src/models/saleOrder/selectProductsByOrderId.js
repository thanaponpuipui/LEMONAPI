const db = require('../../database/lemondb');

module.exports = async ({ orderId }, client = db) => {
  const sql = `
    SELECT
      p.product_id,
      p.product_name,
      p.description,
      p.price * o.amount AS 'price',
      o.amount,
      delivered_amount
    FROM products p
    JOIN order_product o
    ON a.product_id = o.product_id
    WHERE o.order_id = $1
  `;
  const values = [orderId];
  try {
    const { rows } = await client.query(sql, values);

    const products = rows.map((row, count) => {
      const no = count + 1;
      const product = {
        id: row.product_id,
        name: row.product_name,
        description: row.description,
        totalPrice: row.price,
        amount: row.amount,
        delivered: row.delivered_amount,
      };
      return { no, product };
    });

    return products;
  } catch (e) {
    throw e;
  }
};
