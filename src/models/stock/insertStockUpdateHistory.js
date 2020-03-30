const db = require('../../database/lemondb');

module.exports = async ({
  itemId,
  staffId,
  updateAmount,
  newAmount,
  note,
  action
}, client=db) => {
  const sql = `
    INSERT INTO stock_update_history (
      item_id,
      staff_id,
      update_amount,
      total_amount,
      note,
      action
    )
    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    RETURNING stock_update_id
  `;
  const values = [itemId, staffId, updateAmount, newAmount, note, action];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].item_id;
  } catch (e) {
    throw e;
  }
}