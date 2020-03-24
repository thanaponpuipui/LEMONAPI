const db = require('../../database/lemondb');

/* 
  table name: stock_items

  items_id - primary key
  account_id - reference from accounts
  item_name - name of the item
*/

module.exports.insertStockItem = async ({ accountId, name, unit, amount = 0 }, client = db) => {
  const sql = `
    INSERT INTO stock_items(
      account_id,
      item_name,
      unit,
      amount
    )
    VALUES(
      $1,
      $2,
      $3,
      $4
    )
    RETURNING item_id;
  `;
  const values = [accountId, name, unit, amount];
  try {
    const { rows } = await client.query(sql, values);

    return rows[0].item_id;
  } catch (e) {
    throw e;
  }
};

module.exports.useStockItem = async ({ id, amount, unit }, client = db) => {
  const sql = `
    UPDATE stock_items
    SET amount = amount - $1
    WHERE item_id = $2 AND unit = $3
    RETURNING item_id, item_name, unit, amount
  `;
  const values = [amount, id, unit];
  try {
    const { rows } = await client.query(sql, values);
    const newAmount = {
      id: rows[0].item_id,
      name: rows[0].item_name,
      amount: rows[0].amount,
      unit: rows[0].unit,
    };
    return newAmount;
  } catch (e) {
    throw e;
  }
};
