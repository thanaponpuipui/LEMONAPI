const Joi = require('@hapi/joi');
// Joi use Object schema

module.exports.login = (body) => {
}

// register process seperatly
// regist username and password + menbership for account
// join date set to default (current time) fro new user
// assign resturant info for (can not be null)
// contact info input seperate from register form

module.exports.register = (body) => {
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
  // register field post body -
  // username, password, include password confirmed
}

module.exports.assignRest = (body) => {
  // account id !important
  // all field cannot be null
}

module.exports.addStaff = (body) => {

}