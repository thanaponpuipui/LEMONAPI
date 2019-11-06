const Joi = require('@hapi/joi');
// Joi use Object schema

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
  })

  return schema.validate(data);
}

// register process seperatly
// regist username and password + menbership for account
// join date set to default (current time) fro new user
// assign resturant info for (can not be null)
// contact info input seperate from register form

module.exports.registerValidate = (data) => {
  // register field post body -
  // username, password, include password confirmed
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
    passwordConfirmed: Joi.ref('password')
  })

  return schema.validate(data);
}

module.exports.ownerInfoValidate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .pattern(/\D{3,40}/),
    lastName: Joi.string()
      .required()
      .pattern(/\D{3,40}/),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
  })

  return schema.validate(data);
}

module.exports.assignRest = (data) => {
  // account id !important
  // all field cannot be null
}

module.exports.addStaffValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required(),
    isManager: Joi.boolean(),
    phoneNo: Joi.string()
      .trim()
      .regex(/^[0-9]{9,10}$/)
      .required(),
    password: Joi.string()
      .trim()
      .alphanum()
      .min(6)
      .max(12)
  })
}