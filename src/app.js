const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const env = require('./config');

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
app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/branch', branch);
app.use('/staff', staff);
app.use('/order', order);
app.use('/stock', stock);
app.use('/product', product);

app.use((err, req, res) => {
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

app.listen(env.port, () => {
  console.log(`${env.node_env} server run on port ${env.port}`);
});
