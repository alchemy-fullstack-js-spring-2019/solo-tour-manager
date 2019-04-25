require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.port || 7890;

app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});

