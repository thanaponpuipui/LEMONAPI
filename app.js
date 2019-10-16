const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// routes
const authRoute = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyPaser.json());

app.use('/auth', authRoute);

app.use('/', (req, res, next) => {
    res.send('hello');
})


app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
});