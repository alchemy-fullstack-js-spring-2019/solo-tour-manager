const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');


app.use(express.json());
app.use(require('./middleware/meta-weather-api.js'));

app.use('/api/v1/tours', mongoConnection, require('./routes/tours'));

app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
