require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app.js');

const PORT = process.env.PORT || 8888;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(PORT, () => {
  //eslint-disable-next-line
  console.log(`LISTENING ON PORT ${PORT}`);
});
