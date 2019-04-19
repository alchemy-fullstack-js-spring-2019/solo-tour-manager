const express = require('express');
const app = express();



app.use(require('morgan'), ('tiny', {
    skip: () => process.env.NODE_ENV === 'test'
}));


app.use(require('../lib/middleware/notFound'));


module.exports = app;