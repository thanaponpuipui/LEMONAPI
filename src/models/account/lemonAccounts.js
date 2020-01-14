const db = require('../../database/lemondb');
const time = require('../../utils/time');

const TABLE = 'lemon_account';
const ID = 'acc_id';
const NAME = 'login_name';
const PASSWORD = 'password';
const JOIN_DATE = 'join_date';

// ref id for membership level
const MEMBER = 'meminfo_id';

module.exports.lemonAccount = {
  TABLE,
  ID,
  NAME,
  PASSWORD,
  JOIN_DATE,
  MEMBER,
}

module.exports.insertAccount = async (data) => {
  const { username, hash, member } = data;
  const sql = `INSERT INTO ${TABLE}(
    ${NAME},
    ${PASSWORD},
    ${MEMBER}
  )
  VALUES($1, $2, $3)
  RETURNING ${ID}, ${NAME}
  `;
  const values = [username, hash, member];
  try {
    const { rows } = db.query(sql, values);
    if (rows.length < 1) {
      const error = new Error('error returning datas!');
      error.errorCode = 500;
      throw error;
    }
    const { acc_id, login_name } = rows[0]
    const accInfo
    return accInfo;
  } catch (e) {
    throw e;
  }
}