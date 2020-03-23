const db = require('../../database/lemondb');

const TABLE = 'membership';

const ID = 'membership_id';
const TIER = 'tier';
const PRICE = 'price';
const DESC = 'description';

module.exports.getMemberTierId = async ({memberTier}, client=db) => {
  const sql = `SELECT ${ID} FROM ${TABLE} WHERE ${TIER} = $1`;
  const values = [memberTier];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length === 0) {
      const err = new Error('membership tier you request does not available');
      err.errorCode = 500;
      throw err;
    }
    return rows[0].membership_id;
  } catch (e) {
    throw e;
  }
}