const db = require('../../database/lemondb');
const time = require('../../utils/time');

// model variables for writing sql query
const TABLE = 'sale_orders';
const ID = 'sale_id';
const ADD_TIME = 'add_time';
const CHECKED_TIME = 'checked_time';
const TYPE = 'order_type';
const REST_ID = 'rest_id';

/*
 * ------------------model documentation------------------------------
 * @modelStructure {sale_id, add_time, checked_time, order_type, rest_id} sale_orders
 * @modelData {number} sale_id (primary key, index)
 * @modelData {timestamp} add_time
 * @modelData {timestamp} checked_time
 * @modelData {ORDER_TYPE} order_type (only accept 3 values['DELIVERY', 'TAKE AWAY', 'EAT IN'])
 * @modelData {number} rest_id (reference number to resturant table's id)
 *
 * @columnDef {add_time} date and time, customer order food.
 * @columnDef {checked_time}  use for both flag and date and time that customer checkout. is null when mark as unchecked order;
 * @columnDef {order_type} for markup type of order customer made and join delivery and eatin table for more specific details(gusetNo, deliveryType, ...more)
 */

// data selecting functions (SELECT)
module.exports.getSaleOrder = async restId => {
  const sql = {
    text: `SELECT * FROM ${TABLE} WHERE ${REST_ID} = $1`,
    values: [restId],
  };
  try {
    const { rows } = await db.query(sql);
    if (rows <= 0) {
      const err = new Error('no order has added yet!');
      err.errorCode = 400;
      throw err;
    }
    return rows.map(row => {
      const {
        sale_id: saleId,
        add_time: addTime,
        checked_time: checkedTime,
        order_type: orderType,
      } = row;
      return {
        saleId,
        addTime,
        checkedTime,
        orderType,
      };
    });
  } catch (e) {
    if (!e.errorCode) {
      const err = new Error('error database fail selecting data');
      err.errorCode = 500;
      throw err;
    } else {
      throw e;
    }
  }
};

module.exports.isChecked = async orderId => {
  const sql = `SELECT 'IS CHECK'
                FROM ${TABLE}
                WHERE ${ID} = $1 AND ${CHECKED_TIME} IS NOT NULL`;
  const values = [orderId];
  const { rows } = await db.query(sql, values);
  if (rows.length <= 0) {
    return false;
  }
  return true;
};

module.exports.checkout = async orderId => {
  const current = time.now();
  const sql = `UPDATE ${TABLE}
                SET ${CHECKED_TIME} = $1
                WHERE ${ID} = $2
                RETURNING ${ADD_TIME}, ${CHECKED_TIME}, ${TYPE}`;
  const values = [current, orderId];
  try {
    const { rows } = await db.query(sql, values);
    if (rows.length <= 0) {
      const err = new Error('error occur check order. plese refresh and try again');
      err.errorCode = 400;
      throw err;
    }
    const { add_time, checked_time, order_type } = rows[0];
    const checkedItem = {
      addTime: add_time,
      checkedTime: checked_time,
      orderType: order_type,
    };
    return checkedItem;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// data manipulating functions (INSERT, UPDATE)

module.exports.saleOrders = {
  TABLE,
  ADD_TIME,
  CHECKED_TIME,
  TYPE,
  ID,
  REST_ID,
};
