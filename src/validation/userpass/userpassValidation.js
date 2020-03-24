const Joi = require('@hapi/joi');

module.exports = ({rawUsername, password}) => {
  const username = rawUsername.toLowerCase();
  const data = {username, password}
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .lowercase()
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
  })

  return schema.validate(data);
}