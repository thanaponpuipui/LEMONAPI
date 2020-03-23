const db = require('../../database/lemondb');

const TABLE = 'owners';

const ID = 'owner_id';
const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const EMAIL = 'email';
const ADDRESS_ID = 'address_id';


module.exports.owners = {
  TABLE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  ADDRESS_ID,
  ID,
}

module.exports.insertOwner = async (data, client=db) => {
  const {
    firstName,
    lastName,
    email,
    addressId,
  } = data;

  const sql = `INSERT INTO ${TABLE}(
    ${FIRST_NAME},
    ${LAST_NAME},
    ${EMAIL},
    ${ADDRESS_ID}
  )
  VALUES($1, $2, $3, $4)
  RETURNING ${ID}`;

  const values = [
    firstName,
    lastName,
    email || null,
    addressId || null,
  ];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length < 1) {
      const error = new Error('error returning data!');
      error.errorCode = 500;
      throw error;
    }
    const { owner_id } = rows[0];
    return owner_id;
  } catch (e) {
    throw e;
  }
}

module.exports.insertOwnerContactNo = async ({ ownerId, contactNoId, isMain=false }, client=db) => {
  const sql = `
    INSERT INTO owner_contact_no(
      owner_id,
      contact_no_id,
      is_main
    )
    VALUES(
      $1,
      $2,
      $3
    )
  `;
  const values = [ownerId, contactNoId, isMain];
  try {
    await client.query(sql, values);
    
  } catch (e) {
    throw e;
  }
}