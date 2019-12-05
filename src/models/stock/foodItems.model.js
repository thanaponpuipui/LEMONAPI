const db = require('../../database/lemondb');

const TABLE = 'food_items';

const ID = 'food_id';
const NAME = 'food_name';
const PRICE = 'price';
const DETAIL = 'detail';
const REST_ID = 'rest_id';

module.exports.foodItem = {
  TABLE,
  ID,
  NAME,
  PRICE,
  DETAIL,
};
// @param {integer} restId
module.exports.getAllMenus = async restId => {
  const sql = {
    text: `SELECT
            ${ID},
            ${NAME},
            ${PRICE},
            ${DETAIL}
            FROM ${TABLE}
            WHERE ${REST_ID} = $1`,
    values: [restId],
  };
  try {
    const { rows } = await db.query(sql);
    if (rows.length <= 0) {
      const err = new Error('menu list is empty!');
      err.errorCode = 400;
      throw err;
    }
    return rows.map(row => {
      const { food_id, food_name, price, detail } = row;
      const item = {
        id: food_id,
        name: food_name,
        price,
        detail,
      };
      return item;
    });
  } catch (e) {
    throw e;
  }
};
/*
 * @param {Object} data (contain *foodName, *price, detail) * = required
 * @param {integer} restId
 */
module.exports.addFoodItem = async (data, restId) => {
  const { name, price, detail } = data;

  const sql = `INSERT INTO ${TABLE}(
                    ${NAME},
                    ${PRICE},
                    ${DETAIL},
                    ${REST_ID}
                )
                VALUES($1, $2, $3, $4)
                RETURNING ${ID}`;
  const values = [name, price, detail || null, restId];
  try {
    const { rows } = await db.query(sql, values);
    const { food_id } = rows[0];
    return food_id;
  } catch (e) {
    throw e;
  }
};
