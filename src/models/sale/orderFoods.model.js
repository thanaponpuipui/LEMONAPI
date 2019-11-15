const db = require('../../database/lemondb');

const TABLE = 'order_foods';

const ID = 'order_food_id';
const ORDER = 'order_id';
const FOOD = 'food_id';
const AMOUNT = 'amount';
const REMARK = 'remark';

module.exports.orderFoods = {
    ID,
    ORDER,
    FOOD,
    REMARK,
    AMOUNT,
    TABLE,
}