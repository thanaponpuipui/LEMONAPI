const db = require('../../database/lemondb');

const TABLE = 'contact_no';

const ID = 'contact_no_id';
const NO = 'contact_no';

module.exports.contactNo = {
  TABLE,
  ID,
  NO,
};

module.exports.insertContactNo = async ({ number }, client = db) => {
  const sql = `
    INSERT INTO ${TABLE}(
      ${NO}
    )
    VALUES(
      $1
    )
    RETURNING ${ID}
  `;

  const values = [number];

  try {
    const { rows } = await client.query(sql, values);
    if (rows[0].length === 0) {
      const err = new Error('error inserting contact number!');
      err.errorCode = 500;
      throw err;
    }
    const { contact_no_id } = rows[0];
    return contact_no_id;
  } catch (e) {
    throw e;
  }
};

module.exports.getNo = async ({ contactId }) => {
  const sql = `
    SELECT ${NO} FROM ${TABLE} WHERE ${ID} = $1
  `;
  const values = [contactId];
  try {
    const { rows } = await client.query(sql, values);
    const { contact_no: no } = rows[0];

    return no;
  } catch (e) {
    throw e;
  }
};
