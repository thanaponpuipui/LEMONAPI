const db = require('../../database/lemondb');

/* 
  table name: staffs

  staff_id - primary key
  account_id - ref from account table
  address_id - ref from address can be null
  first_name
  last_name
  gender- can be null
  password - hash can be null
  contact_no_id - ref from contact_no table staff has only one contact_no
  is_owner - only owner of account being true indicate that this staff is owner
*/

const TABLE = 'staffs';

const ID = 'staff_id';
const ACCOUNT_ID = 'account_id';
const ADDRESS_ID = 'address_id';
const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const GENDER = 'gender';
const PASSWORD = 'password';
const CONTACT_ID = 'contact_no_id';
const IS_OWNER = 'is_owner';

module.exports.insertOwnerAsStaff = async ({ accountId, firstName, lastName }, client = db) => {
  const sql = `
    INSERT INTO ${TABLE}(
      ${ACCOUNT_ID},
      ${FIRST_NAME},
      ${LAST_NAME},
      ${IS_OWNER}
    )
    VALUES(
      $1,
      $2,
      $3,
      $4
    )
    RETURNING ${ID}
  `;
  const values = [accountId, firstName, lastName, true];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].staff_id;
  } catch (e) {
    throw e;
  }
};

module.exports.getOwnerStaff = async ({ accountId }, client = db) => {
  const sql = `
    SELECT
      staff_id,
      first_name,
      last_name,
      gender,
      password,
      image
    FROM staffs
    WHERE account_id = $1 and is_owner = true;
  `;
  const values = [accountId];
  try {
    const { rows } = await client.query(sql, values);
    const { staff_id, first_name, last_name, gender, password, image } = rows[0];
    const passwordRequire = password ? true : false;
    const data = {
      id: staff_id,
      firstName: first_name,
      lastName: last_name,
      gender: gender,
      position: 'owner',
      image: image,
      passwordRequire,
    };
    return data;
  } catch (e) {
    throw e;
  }
};

module.exports.selectAllBranchStaffs = async ({ branchId, accountId }, client = db) => {
  const sql = `
    SELECT
      s.staff_id,
      s.first_name,
      s.last_name,
      s.gender,
      s.password,
      s.is_owner,
      s.image,
      b.position
    FROM staffs s
    LEFT JOIN branch_staff b
    ON s.staff_id = b.staff_id
    WHERE b.branch_id = $1 OR s.account_id = $2
    ORDER BY s.is_owner desc, b.position, b.join_date
  `;

  const values = [branchId, accountId];

  try {
    const { rows } = await client.query(sql, values);
    const staffList = [];
    rows.forEach(row => {
      const passwordRequire = row.password ? true : false;
      const position = row.is_owner ? 'owner' : row.position;
      const data = {
        id: row.staff_id,
        firstName: row.first_name,
        lastName: row.last_name,
        gender: row.gender,
        image: row.image,
        position,
        passwordRequire,
      };
      staffList.push(data);
    });
    return staffList;
  } catch (e) {
    throw e;
  }
};
