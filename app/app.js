const express = require('express');


const config = require('./config/config');


let app = express();


module.exports = require('./config/express')(app, config);
