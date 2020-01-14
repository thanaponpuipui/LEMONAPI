const db = require('../../database/lemondb');

const TABLE = 'owners';
const ID = 'owner_id';
const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const EMAIL = 'email';
const ADDRESS_ID = 'address_id';
const ACC_ID = 'acc_id';


module.exports.owners = {
  TABLE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  ADDRESS_ID,
  ACC_ID,
  ID,
}

module.exports.insertOwner = async (data, addressId, accountId) => {
  const {
    firstName,
    lastName,
    email,
  } = data;

  const sql = `INSERT INTO ${TABLE}(
    ${FIRST_NAME},
    ${LAST_NAME},
    ${EMAIL},
    ${ADDRESS_ID},
    ${ACC_ID}
  )
  VALUES($1, $2, $3, $4, $5)
  RETURNING ${ID}`;

  const values = [
    firstName,
    lastName,
    email || null,
    addressId,
  ];
  try {
    const ownerId = db.query(sql, values);
    return ownerId;
  } catch (e) {
    throw e;
  }
}