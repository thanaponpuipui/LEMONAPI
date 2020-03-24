const Joi = require('@hapi/joi');

module.exports = (password) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    passwordConfirm: Joi.ref('password'),
  })
  return schema.validate(password);
}