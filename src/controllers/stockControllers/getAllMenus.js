const { getAllMenus } = require('../../models/stock/foodItems.model');

module.exports = allMenu = async (req, res, next) => {
    try {
        const { restId } = req.query;

        const items = await getAllMenus(restId);
        const resData = {
            message: 'success',
            menus:items,
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}