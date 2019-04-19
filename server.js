require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = process.env.port || 7890;

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});

