const db = require('../../database/lemondb');

const TABLE = 'rest_staffs';

const ID = 'staff_id';
const NAME = 'name';
const PASSWORD = 'login_password';
const AVATAR = 'avatar';
const ISMANAGER = 'ismanager';
const PHONE_NO = 'phone_no';
const REST_ID = 'rest_id';


module.exports.restStaffs = {
  ID,
  NAME,
  PASSWORD,
  AVATAR,
  ISMANAGER,
  PHONE_NO,
  REST_ID,
  TABLE,
}

module.exports.insert = async (data, restId) => {
  const { name, password, phoneNo, isManager } = data;
  const sql = `INSERT INTO ${TABLE} (
    ${NAME},
    ${PASSWORD},
    ${PHONE_NO},
    ${ISMANAGER},
    ${REST_ID}
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING ${ID}`
  const values = [name, password, phoneNo, isManager, restId];
  try{
    
    const { rows } = await db.query(sql, values);
    const { staff_id } = rows[0];
    return staff_id;
  } catch (e) {
    throw(e);
  }
}

module.exports.getOneStaff = async (staffId, restId) => {
  console.log(staffId, restId)
  const sql = `SELECT
    ${NAME},
    ${PASSWORD},
    ${PHONE_NO},
    ${ISMANAGER}
    FROM ${TABLE}
    WHERE ${ID} = $1 AND ${REST_ID} = $2
  `;
  const values = [staffId, restId];
  try {
    const { rows } = await db.query(sql, values);
    if (rows.length <= 0) {
      console.log('staff empty')
      return {}
    }
    const {
      name: name,
      login_password: password,
      phone_no: phoneNo,
      ismanager: isManager,
    } = rows[0];
    
    return {
      name,
      password,
      phoneNo,
      isManager,
    }
  } catch (e) {
    throw(e);
  }
}