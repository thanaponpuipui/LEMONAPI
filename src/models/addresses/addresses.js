const db = require('../../database/lemondb');

const TABLE = 'addresses';
const ID = 'address_id';
// houseNo, building, roomNo
const ADDRESS = 'address1';
// road, avenue, alley
const ADDRESS2 = 'address2';
const SUB_DISTRICT = 'sub_district';
const DISTRICT = 'district';
const PROVINCE = 'province';
const POSTCODE = 'postcode';

module.exports.addressInfos = {
  TABLE,
  ID,
  ADDRESS,
  ADDRESS2,
  SUB_DISTRICT,
  DISTRICT,
  PROVINCE,
  POSTCODE,
}

module.exports.insertAddress = async (data, client=db) => {
  const {
    address1,
    address2,
    subDistrict,
    district,
    province,
    postcode,
  } = data;

  const sql = `INSERT INTO ${TABLE}(
    ${ADDRESS},
    ${ADDRESS2},
    ${SUB_DISTRICT},
    ${DISTRICT},
    ${PROVINCE},
    ${POSTCODE}
  )
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING ${ID}
  `;
  const values = [address1, address2, subDistrict, district, province, postcode];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length < 1) {
      const err = new Error('error insert address!');
      err.errorCode = 500;
      throw err;
    }
    const { address_id: id } = rows[0];
    return id;
  } catch (e) {
    throw e;
  }
}

module.exports.selectAddressById = async ({addressId}, client=db) => {
  const sql = `
    SELECT
      ${ADDRESS},
      ${ADDRESS2},
      ${SUB_DISTRICT},
      ${DISTRICT},
      ${PROVINCE},
      ${POSTCODE}
    FROM ${TABLE}
    WHERE ${ID} = $1
  `;

  const values = [addressId];

  try {
    const { rows } = await client.query(sql, values);
    const { address1, address2, sub_district, district, province, postcode } = rows[0];
    const address = {
      address1,
      address2,
      subDistrict: sub_district,
      district,
      province,
      postcode,
    }
    return address;
  } catch (e) {
    throw e;
  }
}