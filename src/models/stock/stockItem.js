const db = require('../../config/lemondb');

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

module.exports.selectBranchStocks = async ({branchId}, client = db) => {
  const sql = `
    SELECT
      a.item_id,
      a.item_name,
      a.unit,
      a.amount
    FROM stock_items a
    JOIN branch_stock b
    ON a.item_id = b.item_id
    WHERE b.branch_id = $1
    ORDER BY item_name
  `;
  const values = [branchId];
  try {
    const { rows } = await client.query(sql, values);
    return rows.map(item => {
      return {
        id: item.item_id,
        name: item.item_name,
        unit: item.unit,
        amount: item.amount,
      }
    })
  } catch (e) {
    throw e;
  }
}

module.exports.updateStockAmount = async ({newAmount, itemId}, client=db) => {
  const sql = `
    UPDATE stock_items
    SET amount = $1
    WHERE item_id = $2
    RETURNING amount
  `;
  const values = [newAmount, itemId];
  try {
    const { rows } = await client.query(sql, values);
    return rows[0].amount;
  } catch (e) {
    throw e;
  }
}

module.exports.minusStockAmount = async ({minusAmount, itemId}, client=db) => {
  const sql = `
    UPDATE stock_items
    SET amount = amount - $1
    WHERE item_id = $2
    RETURNING amount
  `;
  const values = [minusAmount, itemId];
  try {
    const { rows } = await client.query(sql, values);
    return rows[0].amount;
  } catch (e) {
    throw e;
  }
}

module.exports.plusStockAmount = async ({plusAmount, itemId}, client=db) => {
  const sql = `
    UPDATE stock_items
    SET amount = amount + $1
    WHERE item_id = $2
    RETURNING amount
  `;
  const values = [plusAmount, itemId];
  try {
    const { rows } = await client.query(sql, values);
    return rows[0].amount;
  } catch (e) {
    throw e;
  }
}