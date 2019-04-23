const mongoose = require('mongoose');
cons { parse } = require('url');

const mongooseEvent = (event, dbUri) => {
    mongoose.connection.on(event, () => {
        console.log(`Connection to MongoDB ${event} at ${dbUri}`);
    });
};

const redact = dbUri => {
    const parsedDbUri = parse(dbUri);
    const authPart = parsedDbUri.auth ? '***:***@' : '';

    return `${parsedDbUri.protocol}//${authPart}${parsedDbUri.hostname}:${parsedDbUri.port}${parsedDbUri.parthname};`
};

module.exports = (dbUri = process.env.MON)