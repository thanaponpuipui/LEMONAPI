const crypt = require('../../utils/crypt');
const jwt = require('../../utils/jwt');
const { userVerifier } = require('../../utils/userVerifier');

const register = (db) => async (res, req, next) => {
    const { username, password } = req.body;
    const {/* owner info */} = req.body;

    // validation

    const verify = userVerifier(db);
    // use client for tranx
    let currentDateAndTime;
    let client;
    try {
        // check if username already exist
        const isExist = await verify(username);    
        if (isExist) {
            const err = new Error('username is already used');
            err.code = 401;
            throw err;
        }
        // create transaction
        client = await db.connect();
        await client.query('BEGIN');
        // insert owner info
        const ownerId = await client.query('INSERT INTO owner() values($) RETURNING owner_id', []);
        // hash password
        const hash = await crypt.hash(password);
        // insert username and password in database
        const user = await client.query(
            `INSERT INTO 
             lemon_accounts(login_name, password, join_date, membership_id, owner_id)
             values($1, $2, $3, $4, $5)
             RETURNING acc_id, login_name`,
            [username, hash, currentDateAndTime, membership, ownerId]
        );
        await client.query("COMMIT");
        // response
        const token = await jwt.sign(user);
        res.status(200).json(token);
    } catch (e) {
        await client.query('ROLLBACK');
        next(e);
    } finally {
        client.release();
    }

}

module.exports = register;