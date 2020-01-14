const db = require('../../database/lemondb');

const TABLE = 'address_infos';
const ID = 'address_id';
// houseNo, building, roomNo
const ADDRESS = 'address';
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

module.exports.insertAddress = async (data) => {
  const {
    address,
    adderss2,
    subDistrict,
    district,
    province,
    postcode,
  } = data;

  const sql = `INSERT INTO ${TABLE}(
    ${ADDRESS},
    ${ADDERSS2},
    ${SUB_DISTRICT},
    ${DISTRICT},
    ${PROVINCE},
    ${POSTCODE},
  )
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING ${ID}
  `;
}