require('dotenv').config();
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server listening in on port: ${PORT}`);
});
