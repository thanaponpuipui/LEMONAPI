const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(cors())
app.use(bodyPaser.json());

app.use('/', (req, res, next) => {
    res.send('hello');
})

app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
});