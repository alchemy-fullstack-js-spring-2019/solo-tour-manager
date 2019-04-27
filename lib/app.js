const express = require('express');
const app = express();
// const stopsRoutes = require('./routes/stops');
const toursRoutes = require('./routes/tours');

app.use(express.json());

app.use('/tours', toursRoutes);
// app.use('/stops', stopsRoutes);
app.use(require('./middleware/error-handler'));
app.use(require('./middleware/not-found'));
module.exports = app;
