const moment = require('moment');

function now () {
    return moment().format();
}

module.exports = {
    now,
}