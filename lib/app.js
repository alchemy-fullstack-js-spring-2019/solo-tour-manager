const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV = 'test'
}));

app.use(express.json());

app.use('/tours', mongoConnection, require('../lib/routes/tours'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

/* https://www.metaweather.com/api/
https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02
https://www.metaweather.com/api/location/2487956/ */
