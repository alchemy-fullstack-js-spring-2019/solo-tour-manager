const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./middleware/error-handler'));
app.use(require('./middleware/not-found'));
module.exports = app;
