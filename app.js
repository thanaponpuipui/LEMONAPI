const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// routes
const authRoute = require('./routes/auth');
const restRoute = require('./routes/resturant');
const staffRoute = require('./routes/staff');

const app = express();

app.use(cors());
// app.use(bodyPaser.urlencoded({extended:false}))
app.use(bodyPaser.json());
app.use(morgan('dev'));

app.use('/auth', authRoute);
app.use('/rest', restRoute);
app.use('/staff', staffRoute);

app.use((err, req, res, next) => {
    console.log('error handler')
    if (!err.errorCode) {
        err.errorCode = 500;
    }
    res.status(err.errorCode).json({message:err.message});
})

app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
});