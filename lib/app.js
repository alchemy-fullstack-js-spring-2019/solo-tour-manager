const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');
const mongoConnection = require('./middleware/mongo-connection');

app.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
});
app.use('/tours', mongoConnection, tourRoutes);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
