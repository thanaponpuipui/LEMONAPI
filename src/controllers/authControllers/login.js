const jwt = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const { userVerifier } = require('../../utils/userVerifier');

const { loginValidation } = require('../../validation/tempValidate');

const login = db => async (req, res, next) => {
  const { username, password } = req.body;
  const { error: validationError } = loginValidation(req.body);
  // validation
  const verify = userVerifier(db);
  try {
    // check if username is valid
    const account = await verify(username);
    if (!account || validationError) {
      const error = new Error('username or password incorrect');
      error.errorCode = 400;
      throw error;
    }
    const hash = account.password;
    // compare password
    const match = bcrypt.compare(password, hash);
    // return error if anyof above not correct
    if (!match) {
      const error = new Error('username or password incorrect');
      error.errorCode = 400;
      console.error('password incorrect');
      throw error;
    }
    // if pass response with token, id, login name
    const { acc_id: accId } = account;

    const token = jwt.sign({ accId, username });

    const resData = {
      accId,
      username,
      token,
    };

    res.status(200).json(resData);
  } catch (err) {
    next(err);
  }
};

module.exports = login;
