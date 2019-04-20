const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');

app.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
});

module.exports = app;
