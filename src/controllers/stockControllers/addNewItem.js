const db = require('../../database/lemondb');
const { insertBranchItem } = require('../../models/branches');
const { insertItem } = require('../../models/stock');
const noSecialStringValidate = require('../../validation/utils/noSpecialString');

const addNewItem = async (req, res, next) => {
  const { name, branchId  } = req.body;
  const accountId = req.accountId;
  try {
    const {error, value} = noSecialStringValidate(name);
    if (error) {
      const err = new Error('item name contain restricted characters');
      err.errorCode = 400;
      throw err;
    }
    // create trax instance
    const client = await db.connect();
    try {
      // start database trax
      await client.query('BEGIN');
      const itemId = await insertItem({itemName:value, accountId}, client);
      await insertBranchItem({itemId, branchId}, client);
      await client.query('COMMIT');
    } catch (trxError) {
      try {
        await client.query('ROLLBACK');
      } catch (er) {
        throw er;
      }
      throw trxErro;
    } finally {
      client.release();
    }
    const resData = {
      flag: 'success',
      message: 'new item added to stock!',
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = addNewItem;