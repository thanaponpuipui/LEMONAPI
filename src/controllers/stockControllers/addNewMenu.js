const { addFoodItem } = require('../../models/stock/foodItems.model');

module.exports = addNewMenu = async (req, res, next) => {
  try {
    const { restId, name, price, detail } = req.body;
    const food = {
      name,
      price,
      detail,
    };
    await addFoodItem(food, restId);
    const resData = {
      flag: 'success',
      message: 'successfully add new menu!',
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};
