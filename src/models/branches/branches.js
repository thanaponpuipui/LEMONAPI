const db = require('../../database/lemondb');

/* 
  table name : branches
  branch_id - primary key
  account_id - references from accounts
  address_id - references from addresses can be null
  branch_name - name of the branch same as restaurant name if there is an only branch
*/

const TABLE = 'branches';

const ID = 'branch_id';
const ACCOUNT_ID = 'account_id';
const ADDRESS_ID = 'address_id';
const NAME = 'branch_name';

module.exports.insertBranch = async ({ accountId, addressId, branchName }, client = db) => {
  const sql = `
    INSERT INTO ${TABLE}(
      ${ACCOUNT_ID},
      ${ADDRESS_ID},
      ${NAME}
    )
    VALUES(
      $1,
      $2,
      $3
    )
    RETURNING ${ID}
  `;

  const values = [accountId, addressId || null, branchName];
  try {
    const { rows } = await client.query(sql, values);
    const { branch_id } = rows[0];
    return branch_id;
  } catch (e) {
    throw e;
  }
};

module.exports.insertBranchContactNo = async (
  { branchId, contactNoId, isMain = false },
  client = db,
) => {
  const sql = `
    INSERT INTO branch_contact_no(
      branch_id,
      contact_no_id,
      is_main
    )
    VALUES(
      $1,
      $2,
      $3
    )
  `;

  const values = [branchId, contactNoId, isMain];

  try {
    await client.query(sql, values);
  } catch (e) {
    throw e;
  }
};

module.exports.selectAllBranches = async ({ accountId }, client = db) => {
  const sql = `SELECT ${ID}, ${NAME} FROM ${TABLE} WHERE ${ACCOUNT_ID} = $1`;
  const values = [accountId];
  try {
    const { rows } = await client.query(sql, values);
    const branchList = [];
    rows.forEach(row => {
      const { branch_id, branch_name } = row;
      branchList.push({ id: branch_id, name: branch_name });
    });
    return branchList;
  } catch (e) {
    throw e;
  }
};

module.exports.insertBranchItem = async ({ itemId, branchId }, client = db) => {
  const sql = `
    INSERT INTO branch_stock(
      branch_id,
      item_id
    )
    VALUES(
      $1,
      $2
    )
  `;
  const values = [branchId, itemId];

  try {
    await client.query(sql, values);
  } catch (e) {
    throw e;
  }
};

module.exports.isBranchOf = async ({ accountId, branchId }, client = db) => {
  const sql = `
    SELECT branch_name
    FROM branches
    WHERE branch_id = $1 AND account_id = $2
  `;
  const values = [branchId, accountId];
  try {
    const { rows } = await client.query(sql, values);
    if (rows.length === 0) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};
