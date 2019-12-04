const { getOneStaff } = require('./restStaffs.model');

getOneStaff(36,'19')
.then(res => console.log(res)).catch(e => console.log(e))