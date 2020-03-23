const db = require('../../database/lemondb');

const { insertBranchProduct } = require('../../models/branches');
const { insertProduct } = require('../../models/products');
const escapedHtml = require('../../validation/utils/escapeHtml');

module.exports = addNewMenu = async (req, res, next) => {
  const { branchId, name, price, info, imageUrl } = req.body;
  const accountId = req.accountId;
  try {
    const infoEscaped = info ? escapedHtml(info) : null;
    const nameEscaped = escapedHtml(name);   

    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const productId = await insertProduct({
        accountId, 
        name:nameEscaped,
        imageUrl,
        price,
        info:infoEscaped
      }, client);
      await insertBranchProduct({branchId, productId}, client);
      await client.query('COMMIT');
    } catch (trxErr) {
      try {
        await client.query('ROLLBACK');
      } catch (er) {
        throw er;
      }
      throw trxErr
    } finally {
      client.release();
    }

    const resData = {
      flag: 'success',
      message: 'successfully add new menu!',
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};
