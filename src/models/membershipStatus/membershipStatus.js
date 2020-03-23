const db = require('../../database/lemondb');
const time = require('../../utils/time');
const { getMemberTierId } = require('./memberTierId');

/* 
  table name : account_member_status

  account_member_id - primary key
  account_id - ref accounts
  membership_id ref memberships table
  start_date - default now() in psql
  end_date - null at start update date when status end
  status - default pending if paid current, when end ended
*/

const TABLE = 'account_member_status';

const ID = 'account_member_id';
const ACCOUNT_ID = 'account_id';
const MEMBER_ID = 'membership_id';
const START = 'start_date';
const END = 'end_date';
const STATUS = 'status';

module.exports.insertMemberStatus = async ({accountId, memberTier, status='pending'}, client=db) => {
  const sql = `
    INSERT INTO ${TABLE}(
      ${ACCOUNT_ID},
      ${MEMBER_ID},
      ${STATUS}
    )
    VALUES(
      $1,
      $2,
      $3
    )
    RETURNING ${ID}
  `;
  const memId = getMemberTierId(memberTier);

  const values = [accountId, memId, status];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].account_member_id;
  } catch (e) {
    console.log('error insert status')
    throw e;
  }
}

