const crypt = require('../../utils/crypt');
const jwt = require('../../utils/jwt');
const { userVerifier } = require('../../utils/userVerifier');
const time = require('../../utils/time');

const { registerValidate, ownerInfoValidate } = require('../../validation/tempValidate');

const register = (db) => async (req, res, next) => {

    const { username, password, passwordConfirmed } = req.body;
    const { firstName, lastName, email } = req.body;    

    // validation
    const { error:registerInvalid } = registerValidate({username, password, passwordConfirmed});
    const { error:ownerInfoInvalid } = ownerInfoValidate({firstName, lastName, email});
    const verify = userVerifier(db);
    // use client for tranx
    let currentDateAndTime = time.now();
    const client = await db.connect();
    try {
        if (registerInvalid) {
            console.log(registerInvalid);
            throw registerInvalid;
        }
        if (ownerInfoInvalid) {
            console.table(ownerInfoInvalid);
            throw ownerInfoInvalid;
        }
        // check if username already exist
        const isExist = await verify(username);    
        if (isExist) {
            const err = new Error('username is already used');
            err.code = 400;
            throw err;
        }
        // create transaction
        await client.query('BEGIN');
        // hash password
        const hash = await crypt.hash(password);
        // insert username and password in database
        const { rows:id } = await client.query(
            `INSERT INTO 
             lemon_accounts(login_name, password, join_date, meminfo_id)
             VALUES($1, $2, $3, $4)
             RETURNING acc_id`,
            [username, hash, currentDateAndTime, null]
        );
        const { acc_id:accId } = id[0];
        // owner info
        await client.query(
            `INSERT INTO owners(
             first_name,
             last_name,
             email,
             acc_id)
             VALUES($1, $2, $3, $4)`,
             [firstName, lastName, email, accId]
        );
        await client.query("COMMIT");
        // response
        const token = jwt.sign({accId, username});
        // response data for auth state
        const resData = {
            accId,
            username,
            token,
        }
        res.status(200).json(resData);
    } catch (e) {
        await client.query('ROLLBACK');
        console.trace(e);
        next(e);
    } finally {
        client.release();
    }

}

module.exports = register;