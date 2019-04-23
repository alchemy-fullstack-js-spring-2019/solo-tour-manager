const { parse } = require('url');
const mongoose = require('mongoose');

const log = (event, uri) => () => {
  const parsedUri = parse(uri);
  let authPart = '';
  if(parsedUri.auth) {
    authPart = '***:***@';
  }
  const redactedURL = `${parsedUri.protocol}://${authPart}${parsedUri.hostname}:${parsedUri.pathname}`;
  console.log(`mongoDB connection ${event} at ${redactedURL}`);
};

module.exports = (uri = process.env.MONGODB_URI) => {
  mongoose.connect('mongodb://localhost:27017/tours', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
  const events = ['open', 'error', 'close', 'reconnected'];
  events.forEach(event => {
    mongoose.connection.on(event, log(event, uri));
  });
};
