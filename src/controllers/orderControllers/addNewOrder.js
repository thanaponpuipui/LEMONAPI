const { addOrderValidation } = require('../../validation/tempValidate');
/* 
* @ typeDef {pool Object from pg database postgresql driver} databasePool
* @ param {databasePool} db
*/
const addNewOrder = (db) => async (req, res, next) => {
    const accId = req.accId;
    const { restId, foodOrder } = req.body;
    try {
        //validation here


    } catch (e) {
        next(e);
    }

    res.json({accId:accId, message:'it work!'})
}

module.exports = addNewOrder;