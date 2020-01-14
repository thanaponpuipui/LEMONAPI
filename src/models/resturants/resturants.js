const db = require('../../database/lemondb');

const TABLE = 'resturants';
const ID = 'rest_id';
const NAME = 'rest_name';

// for flag as resturant is closed or delete
const IS_CLOSED = 'isClosed';

// ref ID
const ACC_ID = 'acc_id';
const ADDRESS_ID = 'address_id';

module.exports.resturants = {
  TABLE,
  ID,
  NAME,
  IS_CLOSED,
  ACC_ID,
  ADDRESS_ID,
};

module.exports.insertAResturant = (restName, addressId, accountId) => {
  const sql = `INSERT INTO ${TABLE}(
    ${NAME},
    ${ACC_ID},
    ${ADDRESS_ID}
  )
  VALUES($1, $2, $3)
  RETURNING ${ID}, ${NAME}`;
  const values = [
    restName,
    accountId,
    addressId,
  ]
  try {
    const restInfo = db.query(sql, values);
    return restInfo;
  } catch (e) {
    throw e;
  }
}