const { addressValidate, addressIsUndefined } = require('./address');

const testAddress = {
  address1: '',
  address2: '',
  sub_district: '',
  district: '',
  province: '',
  postcode: '',
};

const test = async () => {
  try {
    const isEmpty = addressIsUndefined(testAddress);

    if (!isEmpty) {
      const { error, value } = addressValidate(testAddress);
      if (error) {
        throw error;
      }
      console.log(value);
      return;
    }
    console.log('address empty:', isEmpty);
  } catch (e) {
    console.error(e);
  }
};

test();
