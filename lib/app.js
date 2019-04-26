const express = require('express');
const app = express();
const stopsRoutes = require('./routes/stops');

app.use(express.json());

app.use('/stops', stopsRoutes);
app.use(require('./middleware/error-handler'));
app.use(require('./middleware/not-found'));
module.exports = app;
