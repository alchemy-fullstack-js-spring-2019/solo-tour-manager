const mongoose = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (req, res, next) => {
  const { readyState } = mongoose.connection.readyState;
  if(readyState === state.connected || readyState === state.connected) {
    next();
  } else {
    const error = new Error('Not connected to MongoDB');
    error.status = 500;
    next(error);
  }
};
