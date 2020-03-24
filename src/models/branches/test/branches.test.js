const { insertBranch } = require('../branches');

const branch = {
  accountId: '',
  addressId: '',
  branchName: '',
};

const test = async () => {
  const id = await insertBranch(branch);
  console.log(id);
};

test();
