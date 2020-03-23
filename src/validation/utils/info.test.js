const infoValidate = require('./infoValidation');
const escapsHtml = require('./escapeHtml');

const info = `&\<>/'"`

function test () {
  const {value, error} = infoValidate(info);
  console.log('value', value);
  console.log('error', error);
  return escapsHtml(value)
}

console.log(test());