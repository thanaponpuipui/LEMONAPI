const { checkout, isChecked } = require('../../models/sale/saleOrders.model');

module.exports = orderCheckout = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (await isChecked(id)) {
            const err = new Error('order has already checked!');
            err.errorCode = 400;
            throw err;
        }
        const order = await checkout(id)
        const resData = {
            message: 'success',
            order
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}