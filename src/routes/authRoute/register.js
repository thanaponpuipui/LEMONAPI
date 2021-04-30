const crypt = require('../../utils/crypt');
const { userVerifier } = require('../../utils/userVerifier');


const { insertAddress } = require('../../models/addresses');
const { insertContactNo } = require('../../models/contactNo');
const { insertAccount } = require('../../models/accounts');
const { insertOwner, insertOwnerContactNo } = require('../../models/owners');
const { insertBranch, insertBranchContactNo } = require('../../models/branches');
const { insertOwnerAsStaff } = require('../../models/staffs');
const { insertMemberStatus } = require('../../models/membershipStatus');

const register = db => async (req, res, next) => {
  let client;
  try {
    const {
      firstName,
      lastName,
      username: rawUsername,
      password,
      passwordConfirm,
      email,
      restName,
      contactNo,
      restContactNo,
      address,
      restAddress,
      isSameAddress,
    } = req.body;
    // validation
    const { error: wrongPasswordConfirm } = passRepeat({password, passwordConfirm})
    const { error: registerInvalid, value:userpassValue } = userpassValidation({ rawUsername, password, passwordConfirm });
    const { error: ownerInfoInvalid } = ownerInfoValidate({ firstName, lastName, email });

    const { username } = userpassValue;
    const verify = userVerifier(db);

    if (registerInvalid) {
      console.log(registerInvalid);
      throw registerInvalid;
    }
    if (ownerInfoInvalid) {
      console.table(ownerInfoInvalid);
      throw ownerInfoInvalid;
    }
    if (wrongPasswordConfirm) {
      console.table(wrongPasswordConfirm);
      throw wrongPasswordConfirm;
    }
    // check if username already exist
    const isExist = await verify(username);
    if (isExist) {
      const err = new Error('username is already used');
      err.errorCode = 400;
      throw err;
    }

    client = await db.connect();
    const hash = await crypt.hash(password);

    // create transaction
    try {
      await client.query('BEGIN');

      let addressId;
      let restAddressId;
      let contactNoId;
      let restContactNoId;
      let status = 'pending';
      let memberTier = 'demo';
      if (memberTier === 'demo' || memberTier === 'free') status = 'current';
      // address optional
      if (!addressIsUndefined(address)) {
        const { error } = addressValidate(address);
        if (error) throw error;
        addressId = await insertAddress(address, client);
      }

      if (!addressIsUndefined(restAddress)) {
        if (!isSameAddress) {
          const { error } = addressValidate(restAddress);
          if (error) throw error;
          restAddressId = await insertAddress(restAddress, client);
        } else {
          restAddressId = addressId;
        }
      }
      // required
      const ownerId = await insertOwner({ firstName, lastName, email, addressId }, client);
      const accountId = await insertAccount({ username, hash, restName, ownerId }, client);
      const statusId = await insertMemberStatus({ accountId, memberTier, status }, client);
      const branchId = await insertBranch(
        { accountId, addressId: restAddressId, branchName: restName },
        client,
      );
      const staffId = await insertOwnerAsStaff({ accountId, firstName, lastName }, client);
      // contactNo optional
      if (!phoneNumberIsUndefined(contactNo)) {
        const { error } = phoneNumberValidate(contactNo);
        if (error) throw error;
        contactNoId = await insertContactNo({ number: contactNo }, client);
        await insertOwnerContactNo({ ownerId, contactNoId, isMain: true }, client);
      }

      if (!phoneNumberIsUndefined(restContactNo)) {
        const { error } = phoneNumberValidate(restContactNo);
        if (error) throw error;
        restContactNoId = await insertContactNo({ number: restContactNo }, client);
        await insertBranchContactNo(
          { branchId, contactNoId: restContactNoId, isMain: true },
          client,
        );
      }

      await client.query('COMMIT');
      const log = {
        accountId,
        ownerId,
        addressId,
        restAddressId,
        contactNoId,
        restAddressId,
        restContactNoId,
        staffId,
        statusId,
        branchId,
      };
      console.log(log);
    } catch (trxError) {
      try {
        await client.query('ROLLBACK');
      } catch (er) {
        throw er;
      }
      throw trxError;
    } finally {
      client.release();
    }

    // const token = jwt.sign({ accountId, username });
    // const staffToken = jwt.sign({staffId})

    // response data for auth state
    const resData = {
      flag: 'success',
      message: 'register success!',
    };
    res.status(200).json(resData);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = register;
