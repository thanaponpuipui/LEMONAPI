const db = require('../../database/lemondb');

const insertStockConsume = async ({productId, itemId, amount=0}, client=db) => {
  const sql = `
    INSERT INTO stock_consume(
      product_id,
      item_id,
      amount
    )
    VALUES(
      $1,
      $2,
      $3
    )
  `;
  const values = [productId, itemId, amount];
  try {
    await client.query(sql, values);
  } catch (e) {
    throw e;
  }
}

module.exports = insertStockConsume;