const mongoose = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (req, res, next) => {
    const readyState = mongoose.connection.readyState;
    if(readyState === state.connected || readyState === state.connecting) {
        console.log('mongo connection state', readyState);
        next();
    } else {
        const error = new Error('Unable to connect to db');
        error.status = 500;
        next(error);
    }
};
