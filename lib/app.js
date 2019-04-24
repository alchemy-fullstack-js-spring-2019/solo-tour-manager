const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tour = require('./models/Tour');


app.use(express.json());
app.use(require('./middleware/meta-weather-api.js'));

app.use('/api/v1/tours', require('./routes/tours'));

app.use(require('./middleware/error'));

module.exports = app;
