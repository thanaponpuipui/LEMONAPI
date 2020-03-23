const db = require('../../database/lemondb');

/* 
  table name: stock_items

  items_id - primary key
  account_id - reference from accounts
  item_name - name of the item
*/

module.exports.insertItem = async ({accountId, itemName}, client=db) => {
  const sql = `
    INSERT INTO stock_items(
      account_id,
      item_name
    )
    VALUES(
      $1,
      $2
    ) RETURNING item_id;
  `;
  const values = [accountId, itemName];
  try {
    const { rows } = await client.query(sql, values);
    
    return rows[0].item_id;
  } catch (e) {
    throw e;
  }
}
