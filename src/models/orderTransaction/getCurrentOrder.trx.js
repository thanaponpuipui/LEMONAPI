const db = require('../../database/lemondb');

const { saleOrders } = require('../sale/saleOrders.model');
const { eatInType, deliveryType } = require('../sale/orderType.model');
const { orderFoods } = require('../sale/orderFoods.model');

// data selecting functions
module.exports.getCurrentTakeAwayOrder = async restId => {
  const { ID, ADD_TIME, TYPE, TABLE, REST_ID } = saleOrders;
  const sql = `SELECT ${ID},
                        ${ADD_TIME},
                        ${TYPE}
                FROM ${TABLE}
                WHERE ${TYPE} = $1 AND ${REST_ID} = $2`;
  const values = ['TAKE AWAY', restId];
  try {
    const { rows } = await db.query(sql, values);
    if (rows.length <= 0) {
      const err = new Error('currently no order');
      err.errorCode = 400;
      throw err;
    }
    return rows.map(row => {
      const { sale_id, add_time, order_type } = row;
      const order = {
        id: sale_id,
        addTime: add_time,
        orderType: order_type,
      };
      return order;
    });
  } catch (e) {
    throw e;
  }
};

/* module.exports.getCurrentEatInOrder = async (restId) => {
    try {

    } catch (e) {

    }
}

module.exports.getCurrentDeliveryOrder = async (restId) => {
    try {

    } catch (e) {

    }
} */

module.exports.getAllCurrentOrder = async restId => {
  const { ID, ADD_TIME, TYPE, TABLE, REST_ID, CHECKED_TIME } = saleOrders;
  const sql = `SELECT ${ID},
                        ${ADD_TIME},
                        ${TYPE}
                FROM ${TABLE}
                WHERE ${REST_ID} = $1 AND ${CHECKED_TIME} is null`;
  const values = [restId];
  try {
    const { rows } = await db.query(sql, values);
    if (rows.length <= 0) {
      const err = new Error('currently no order');
      err.errorCode = 400;
      throw err;
    }
    return rows.map(row => {
      const { sale_id, add_time, order_type } = row;
      const order = {
        id: sale_id,
        addTime: add_time,
        orderType: order_type,
      };
      return order;
    });
  } catch (e) {
    throw e;
  }
};
