const db = require('../../database/lemondb');
const time = require('../../utils/time');

const { saleOrders } = require('../sale/saleOrders.model');
const { eatInType, deliveryType } = require('../sale/orderType.model');
const { orderFoods } = require('../sale/orderFoods.model');

/* async function beginTransaction () {
    const client = await db.connect();
    await client.query('BEGIN');
    return client;
}
async function rollback (client) {
    await client.query('ROLLBACK');
}
async function commit (client) {
    await client.query('COMMIT');
}
function endTransaction (client) {
    client.release()
} */

/* 
* @param {object} data
* data structure
* orderType and items
* type of orderType is object that contain "type" property
* values of type can be take away, eat in or delivery (case unsensitive)
* if type equal "take away" the ordertype contain only one property
* if the values equal to "delivery" or "eat in", will have another two property
* delivery - deliveryService and refCode
* eat in - guestNo and tableNo
*
* items can be either Array or Object type one item or more than one items
* in each item contain foodId, amount, and remark(optional)
*/

module.exports.newOrder = async (data, restId) => {
    const current = time.now();
    console.log('sale',saleOrders);
    console.log('eat',eatInType);
    console.log('order',orderFoods);
    console.log('deli',deliveryType);
    const { orderType, items } = data;
    if (!(items instanceof Array)) {
        const err = new Error('invalid items!');
        err.errorCode = 400;
        throw err;   
    }
    let client;
    try {
        client = await db.connect()
        await client.query('BEGIN');
        const insertOrder = {
            text: `INSERT INTO ${saleOrders.TABLE}(
                ${saleOrders.ADD_TIME},
                ${saleOrders.TYPE},
                ${saleOrders.REST_ID}
            )
            VALUES($1, $2, $3)
            RETURNING ${saleOrders.ID}`,
            values: [current, orderType.type.toUpperCase(), restId]
            }
        const { rows } = await client.query(insertOrder);
        const { sale_id:saleId } = rows[0];
        
        if (orderType.type.toLowerCase() === 'eat in') {
            const { guestNo, tableNo } = orderType;
            const insertEatIn = {
                text: `INSERT INTO ${eatInType.TABLE}(
                    ${eatInType.GUEST_NO},
                    ${eatInType.TABLE_NO},
                    ${eatInType.SALE_ID}
                )
                VALUES($1, $2, $3)`,
                values: [guestNo || null, tableNo || null, saleId]
            }
            await client.query(insertEatIn);
        } else if (orderType.type.toLowerCase() === 'delivery') {
            const { deliveryService, refCode } = orderType;
            const insertDelivery = {
                text: `INSERT INTO ${deliveryType.TABLE}(
                    ${deliveryType.SERVICE},
                    ${deliveryType.REF_CODE},
                    ${deliveryType.SALE_ID}
                )
                VALUES($1, $2, $3)`,
                values: [deliveryService, refCode, saleId]
            }
            await client.query(insertDelivery);
        }
        const insertOrderFood = `INSERT INTO ${orderFoods.TABLE}(
            ${orderFoods.ORDER},
            ${orderFoods.FOOD},
            ${orderFoods.AMOUNT},
            ${orderFoods.REMARK}
        )
        VALUES($1, $2, $3, $4)`
        for (let i = 0; i < items.length; i++) {
            const { foodId, amount, remark } = items[i];
            const values = [saleId, foodId, amount, remark || null];

            await client.query(insertOrderFood, values);
        }
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log('error',e);
        throw e;
    } finally {
        client.release();
    }
}