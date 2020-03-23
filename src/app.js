const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// routes
const authRoute = require('./routes/auth');
const branchRoute = require('./routes/branch');
const staffRoute = require('./routes/staff');
const orderRoute = require('./routes/order');
const stockRoute = require('./routes/stock');

const app = express();

app.use(cors());
// app.use(bodyPaser.urlencoded({extended:false}))
app.use(bodyPaser.json());
app.use(morgan('dev'));

app.use('/auth', authRoute);
app.use('/branch', branchRoute);
app.use('/staff', staffRoute);
app.use('/order', orderRoute);
app.use('/stock', stockRoute);

app.use((err, req, res, next) => {
  console.log('error handler', err.message);
  if (!err.errorCode) {
    err.errorCode = 500;
  }
  const resData = {
    flag: 'error',
    status: err.errorCode,
    message: err.message,
  };
  res.status(err.errorCode).json(resData);
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} server run on port ${process.env.PORT}`);
});
