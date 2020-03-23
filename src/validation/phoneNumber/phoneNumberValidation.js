const Joi = require('@hapi/joi');
// @param {string} number - numeric string
module.exports.phoneNumberValidation = (number) => {
  const phone = Joi.string().regex(/^0\d{8,9}/);

  return phone.validate(number)
}
// @param {string} number - numeric string
module.exports.phoneNumberIsUndefined = (number) => {
  // valid only when empty
  const phone = Joi.string().max(0).empty('');

  const {error} = phone.validate(number);
  // if no error meaning that the value is empty. then return true
  if (!error) return true;

  return false;
}