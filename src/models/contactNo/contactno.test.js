const {insertNo, getNo} = require('./contactNo');


const contactNoTest = async () => {
  
  const testno = '0890352352';
  const contactId = await insertNo({number:testno});

  const myTestNumber = await getNo({contactId:contactId})
  console.log('result:', myTestNumber)
  console.log('typeof result: ', typeof myTestNumber);
}

contactNoTest();