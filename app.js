const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use('/', (req, res, next) => {
    res.send('hello');
})

app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
});