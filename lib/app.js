const express = require('express');
const app = express();


app.use(express.json());

app.use(mongoose.model('Tour', tourSchema);

app.use(require('./middleware/error'));

module.exports = app;
