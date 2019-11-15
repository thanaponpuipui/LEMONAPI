const db = require('../../database/lemondb');

const TABLE = 'food_receipts';

const ID = 'receipt_id';
const FOOD = 'food_id';
const INGREDIENT = 'ingredient_id';
const AMOUNT = 'amount';

module.exports.foodReceipts = {
    TABLE,
    ID,
    FOOD,
    INGREDIENT,
    AMOUNT
}

/* 
* @param {an Array Of Objects || an Object} ingredients
* @param {integer} foodId
*/
module.exports.addReceipts = (ingredients, foodId) => {
    const sql = `INSERT INTO ${TABLE}(
                    ${INGREDIENT},
                    ${AMOUNT},
                    ${FOOD}
                )
                VALUES($1, $2, $3)`;
    let values;

    function addMultiple (items) {
        items.forEach(async (item) => {
            const {id, amount} = item;
            values = [id, amount, foodId];
            await db.query(sql, values);
        })
    }
    async function addOne (item) {
        const { id, amount } = item;
        values = [id, amount, foodId];
        await db.query(sql, values);
    }
    try {
        if (ingredients instanceof Array) {
            addMultiple(ingredients);
        } else if (ingredients instanceof Object) {
            addOne(ingredients);
        } else {
            const err = new Error('invalid ingredients data!');
            err.errorCode = 400;
            throw err;
        }
    } catch (e) {
        throw e;
    }
}