const jwt = require("../../utils/jwt");
const { selectRestaurantName } = require("../../models/accounts");

const check = async (req, res, next) => {
  const token = req.query.token;
  let decodeToken;
  try {
    decodeToken = jwt.verify(token);
  } catch (e) {
    e.errorCode = 500;
    next(e);
  }
  const { accountId, username } = decodeToken;
  let restaurantName;
  try {
    restaurantName = await selectRestaurantName({ accountId });
  } catch (e) {
    next(e);
  }

  const data = {
    id: accountId,
    username,
    restaurantName,
    token,
  };
  const resData = {
    flag: "success",
    message: "login success",
    data,
  };

  return res.status(200).json(resData);
};

module.exports = check;
