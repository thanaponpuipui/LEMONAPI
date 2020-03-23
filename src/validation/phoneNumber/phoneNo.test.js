const {phoneNumberIsUndefined, phoneNumberValidation} = require('./phoneNumberValidation');

const number = '0890352352';

const test = () => {
  try {
    const isEmpty = phoneNumberIsUndefined(number);
    if (!isEmpty) {
      const { error, value } = phoneNumberValidation(number);
      if (error) {
        throw error;
      }
      console.log(value);
      return
    }
    console.log('phoneNumber is empty:' , isEmpty);
  } catch (e) {
    console.error(e)
  }
}

test();