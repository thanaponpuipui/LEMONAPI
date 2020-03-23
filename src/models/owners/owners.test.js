const { insertOwnerContactNo, insertOwner } = require('./owners');

const person = {
  firstName: 'Jonathan',
  lastName: 'Bigtits',
  email: 'joanaBig@gg.com',
}

const test = async () => {
  try {
    const id = await insertOwner(person);
    await insertOwnerContactNo({ownerId:id, contactNoId:1, isMain:true})
  } catch (e) {
    console.error(e);
  }
}

test();