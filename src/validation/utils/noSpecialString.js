const Joi = require('@hapi/joi');

const noSpecialString = (string) => {
  const schema = Joi.string().regex(/[\u0E00-\u0E7Fa-zA-Z \d]/);

  return schema.validate(string);
}

module.exports = noSpecialString