const db = require('../../config/lemondb');
const { insertBranchItem } = require('../../models/branches');
const { insertStockItem } = require('../../models/stock');
const noSecialStringValidate = require('../../validation/utils/noSpecialString');
const Transaction = require('../../models/transaction');

const addNewItem = async (req, res, next) => {
  const { name, branchId, unit, amount } = req.body;
  const accountId = req.accountId;
  try {
    const { error, value } = noSecialStringValidate(name);
    if (error) {
      const err = new Error('item name contain restricted characters');
      err.errorCode = 400;
      throw err;
    }
    // create trax instance
    const transaction = new Transaction();
    const client = await transaction.initTransaction();
    try {
      // start database trax
      await transaction.startTransaction();
      const itemId = await insertStockItem({ name: value, accountId, unit, amount }, client);
      await insertBranchItem({ itemId, branchId }, client);
      await transaction.endTransaction()
    } catch (trxError) {
      try {
        await transaction.Rollback();
      } catch (er) {
        throw er;
      }
      throw trxError;
    } finally {
      transaction.release();
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
