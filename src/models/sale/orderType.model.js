const db = require('../../database/lemondb');

/*
 * this module contain 2 tables (delivery_order, eat_in_order)
 * both use "sale_id for reference to sale_orders table"
 */
const SALE_ID = 'sale_id';
// eat_in_order
const IN_TABLE = 'eat_in_order';
const IN_ID = 'in_id';
const GUEST_NO = 'guest_no';
const TABLE_NO = 'table_no';

/*
 *
 *
 *
 *
 *
 */

module.exports.eatInType = {
  TABLE: IN_TABLE,
  ID: IN_ID,
  GUEST_NO,
  TABLE_NO,
  SALE_ID,
};

// delivery_order
const DELI_TABLE = 'delivery_order';

const DELI_ID = 'deli_id';
const SERVICE = 'deli_service';
const REF_CODE = 'ref_code';

/*
 *
 *
 *
 *
 *
 */

module.exports.deliveryType = {
  TABLE: DELI_TABLE,
  ID: DELI_ID,
  SERVICE,
  REF_CODE,
  SALE_ID,
};
