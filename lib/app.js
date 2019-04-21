const express = require('express');
const app = express();
app.use(express.json());



app.use(require('morgan')('tiny', {
    skip: () => process.env.NODE_ENV === 'test'
}));



app.use('/api/v1/tours', require('./routes/tours'));
app.use('/api/v1/stops', require('./routes/stops'));
//enter routes here

module.exports = app;
