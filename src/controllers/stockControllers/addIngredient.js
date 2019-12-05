const { addIngredient: addOneIngredient } = require('../../models/stock/ingredients.model');

const addIngredient = async (req, res, next) => {
  try {
    const { name, detail, restId } = req.body;
    // validation

    const item = {
      name,
      detail,
    };
    const id = await addOneIngredient(item, restId);

    const resData = {
      flag: 'success',
      message: 'new ingredient added!',
      data: { id },
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = addIngredient;
