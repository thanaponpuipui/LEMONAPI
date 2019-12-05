const db = require('../../database/lemondb');

const TABLE = 'ingredients';

const ID = 'ingredient_id';
const NAME = 'ingredient_name';
const DETAIL = 'detail';
const REST_ID = 'rest_id';

module.exports.ingredients = {
  TABLE,
  ID,
  NAME,
  DETAIL,
};

// @param {integer} restId
module.exports.getAllIngredients = async restId => {
  const sql = `SELECT 
                ${ID},
                ${NAME},
                ${DETAIL}
                FROM ${TABLE}
                WHERE ${REST_ID} = $1`;
  const values = [restId];
  try {
    const { rows } = await db.query(sql, values);
    if (rows.length <= 0) {
      const err = new Error('stock list is empty!');
      err.errorCode = 400;
      throw err;
    }
    return rows.map(row => {
      const { ingredient_id, ingredient_name, detail } = row;
      const item = {
        id: ingredient_id,
        name: ingredient_name,
        detail,
      };
      return item;
    });
  } catch (e) {
    throw e;
  }
};
/*
 * @param {Object} data (*ingredientName, detail)
 *
 */
module.exports.addIngredient = async (data, restId) => {
  const { name, detail } = data;
  const detailValue = detail || null;
  const sql = `INSERT INTO ${TABLE}(
                    ${NAME},
                    ${DETAIL},
                    ${REST_ID}
                )
                VALUES($1, $2, $3)
                RETURNING ${ID}`;
  const values = [name, detailValue, restId];

  try {
    const { rows } = await db.query(sql, values);
    const { ingredient_id: id } = rows[0];
    return id;
  } catch (e) {
    throw e;
  }
};
