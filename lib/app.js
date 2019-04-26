const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
app.use(express.json());



app.use(require('morgan')('tiny', {
    skip: () => process.env.NODE_ENV === 'test'
}));



app.use('/api/v1/tours', mongoConnection, require('./routes/tours'));
//app.use('/api/v1/stops', require('./routes/stops'));
//enter routes here
app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
