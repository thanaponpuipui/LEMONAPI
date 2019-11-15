const { addIngredient:addOneIngredient } = require('../../models/stock/ingredients.model');

const addIngredient = (db) => async (req, res, next) => {
    try {
        const { name, detail, restId } = req.body;
        // validation
        
        const item = {
            name,
            detail,
        }
        const id = await addOneIngredient(item, restId);

        const resData = {
            id: id,
            message: 'new ingredient added!'
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = addIngredient;