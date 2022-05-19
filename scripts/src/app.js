const express = require('express');
const cors = require('cors');
const { NotFound } = require('http-errors');

const { decodeAddressActivity } = require('./ParseWebhook')

var app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());


app.get('/', (req, res) => res.send('Welcome ...'));
app.post('/webhook', (req, res, next) => {
    console.log("webhook called: ");
    return decodeAddressActivity(req, res);
});

let port = parseInt(process.env.PORT || '3000')
app.listen(port);
console.log('Listening on port ' + port + '...');

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(NotFound());
});
// error handler
app.use((err, req, res, next) => {

    console.log(err);
    let code;
    if (err !== undefined && err.code === "NotAuthorizedException") {
        code = 400;
    } else {
        code = (err !== undefined && err.statusCode !== undefined) ? err.statusCode : 500;
    }
    let msg = (err !== undefined && err.message !== undefined) ? err.message : 'Internal Server Error';
    const resData = {
        code: code,
        message: msg
    };
    return res.status(code).json({
        success: false,
        data: resData
    });
});

module.exports = app;