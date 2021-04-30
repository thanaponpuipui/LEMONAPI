const Transaction = require('../../models/transaction');

const { insertBranchProduct } = require('../../models/branches');
const { insertProduct, insertStockConsume } = require('../../models/products');

const addNewProduct = async (req, res, next) => {
  const { branchId, name, price, description, imageUrl, stockUsage } = req.body;
  const accountId = req.accountId;
  if (stockUsage && !Array.isArray(stockUsage)) {
    const err = new Error('bad request!');
    err.errorCode = 400;
    next(err);
  }
  try {
    if (!name || !price) {
      const error = new Error('Please fill required inputs')
      error.errorCode = 400;
      throw error;
    } 
    const infoEscaped = description ? escapedHtml(description) : null;
    const nameEscaped = escapedHtml(name);

    // const client = await db.connect();
    const transaction = new Transaction();
    const client = await transaction.initTransaction();
    let productId;
    try {
      await transaction.startTransaction();
      productId = await insertProduct(
        {
          accountId,
          name: nameEscaped,
          imageUrl,
          price,
          description: infoEscaped,
        },
        client,
      );
      const SCPromise = stockUsage.map(stock => {
        const { amount, id } = stock;
        return insertStockConsume({ productId, amount, itemId: id }, client);
      });
      await insertBranchProduct({ branchId, productId }, client);
      // wait till all sc done then move on
      await Promise.all(SCPromise);
      await transaction.endTransaction();
    } catch (trxErr) {
      await transaction.Rollback();
      throw trxErr;
    } finally {
      transaction.release();
    }

    const resData = {
      flag: 'success',
      message: 'successfully add new menu!',
      data: {id: productId},
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};
module.exports=addNewProduct;