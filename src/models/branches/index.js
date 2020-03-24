const branchModel = require('./branches');
const branchProductModel = require('./branchProducts');

module.exports = {
  ...branchModel,
  ...branchProductModel,
};
