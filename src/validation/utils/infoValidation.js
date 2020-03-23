const Joi = require('@hapi/joi');

module.exports =  (para) => {
  const schema = Joi.string().empty('');

  return schema.validate(para);
};