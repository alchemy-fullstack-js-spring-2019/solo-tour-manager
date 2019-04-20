const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');
const mongoConnection = require('./middleware/mongo-connection');
const tourRoutes = require('./routes/tours');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use(express.json());

app.use('/tours', mongoConnection, tourRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
