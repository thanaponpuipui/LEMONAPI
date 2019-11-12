const addIngredient = (db) => async (req, res, next) => {
    const { iName, details, restId } = req.body;
    const sql = {
        text: 'INSERT INTO ingredients(ingredient_name, details, rest_id) VALUES($1, $2, $3) RETURNING ingredient_id',
        values: [iName, details, restId],
    }
    try {
        // validation

        const { rows } = await db.query(sql);
        if (rows.length <= 0) {
            const err = new Error('fail to added ingredient');
            err.codeError = 500;
            throw err;
        }
        const { ingredients_id: id } = rows[0];
        console.log(id);
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