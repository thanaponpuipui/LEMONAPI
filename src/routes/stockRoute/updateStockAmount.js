const { updateStockAmount, minusStockAmount, plusStockAmount, insertStockUpdateHistory } = require('../../models/stock');
const Transaction = require('../../models/transaction');

const updateStockAmount = async (req, res, next) => {
  const { itemId, configAmount, mode, staffId, note } = req.body;
  console.log('request body', req.body)
  try {
    const updateTransaction = new Transaction();
    const client = await updateTransaction.initTransaction();
    let newAmount;
    try {
      await updateTransaction.startTransaction();
      console.log('start')
      switch (mode) {
        case 'update' :
          console.log('start updating')
          newAmount = await updateStockAmount({itemId, newAmount:configAmount}, client);
          console.log(newAmount, 'done updating')
          break;
        case 'minus' :
          newAmount = await minusStockAmount({itemId, minusAmount:configAmount}, client);
          break;
        case 'plus' :
          newAmount = await plusStockAmount({itemId, plusAmount:configAmount}, client);
          break;
        default :
        console.log('error')
          const err = new Error('invalid stock amount config mode!');
          err.errorCode = 402;
          throw err;
      }
      console.log('done update start inserting')
      await insertStockUpdateHistory({
        itemId,
        staffId,
        note,
        newAmount,
        updateAmount:configAmount,
        action:mode,
      }, client);
      console.log(newAmount)
      console.log('end')
      await updateTransaction.endTransaction();
    } catch (trxErr) {
      await updateTransaction.Rollback();
      throw trxErr;
    } finally {
      if (client) updateTransaction.release();
    }
    
    const response = {
      flag: 'success',
      message: 'update stock success!',
    }

    res.status(200).json(response)
  } catch (e) {
    next(e);
  }
}

module.exports = updateStockAmount;