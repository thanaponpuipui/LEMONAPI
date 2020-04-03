const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// routes
const {
  auth,
  branch,
  order,
  product,
  staff,
  stock,
} = require('./routes');

const app = express();

app.use(cors());
// app.use(bodyPaser.urlencoded({extended:false}))
app.use(bodyPaser.json());
app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/branch', branch);
app.use('/staff', staff);
app.use('/order', order);
app.use('/stock', stock);
app.use('/product', product);

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
