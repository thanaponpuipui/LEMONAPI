const db = require('../../config/lemondb');

const TABLE = 'accounts';
const ID = 'account_id';

const NAME = 'login_name';
const PASSWORD = 'password';
const RESTAURANT_NAME = 'restaurant_name';
const JOIN_DATE = 'join_date';
const OWNER = 'owner_id';

// ref id for membership level
// const MEMBER = 'meminfo_id';

module.exports.insertAccount = async (data, client = db) => {
  const { username, hash, restName, ownerId } = data;
  const sql = `INSERT INTO ${TABLE}(
    ${NAME},
    ${PASSWORD},
    ${RESTAURANT_NAME},
    ${OWNER}
  )
  VALUES($1, $2, $3, $4)
  RETURNING ${ID}
  `;
  const values = [username, hash, restName, ownerId];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length < 1) {
      const error = new Error('error returning datas!');
      error.errorCode = 500;
      throw error;
    }
    return rows[0].account_id;
  } catch (e) {
    throw e;
  }
};

module.exports.selectRestaurantName = async ({ accountId }, client = db) => {
  const sql = `
    SELECT restaurant_name
    FROM accounts
    WHERE account_id = $1
  `;
  const values = [accountId];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length === 0) throw new Error('error getting restaurant name!');
    return rows[0].restaurant_name;
  } catch (e) {
    throw e;
  }
};
