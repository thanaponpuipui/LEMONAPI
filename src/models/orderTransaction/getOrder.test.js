const { getCurrentTakeAwayOrder } = require('./getCurrentOrder.trx');

const restId = 19;

getCurrentTakeAwayOrder(restId)
.then(orders => console.table(orders))
.catch(e => console.log(e));