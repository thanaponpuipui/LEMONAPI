const jwt = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const { userVerifier } = require('../../utils/userVerifier');

const { userpassValidation } = require('../../validation/userpass');

const login = db => async (req, res, next) => {
  const { username:rawUsername, password } = req.body;
  // validation
  const verify = userVerifier(db);
  // validate input
  const {error: validationError, value} = userpassValidation({rawUsername, password})
  const { username } = value;
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
    const { account_id, restaurant_name } = account;

    const token = jwt.sign({ accountId: account_id, username });

    const data = {
      accountId: account_id,
      restaurantName: restaurant_name,
      username,
      token,
    };
    const response = {
      flag:'success',
      message:'login complete',
      data,
    }
    console.log(response);

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = login;
