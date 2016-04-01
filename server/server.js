const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/speechdoctor');

require('./config/middleware')(app, express);
require('./config/routes.js')(app);

const port = process.env.PORT || 8080;

app.listen(port);

console.log('Listening on port ', port);

module.exports = app;
