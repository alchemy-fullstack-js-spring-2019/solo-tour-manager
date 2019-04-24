/*eslint-disable*/
module.exports = (req, res, next) => {
  console.log('never run (you wrote this)');
  res.status(404)
    .send({ error: 'Not Found' });
};
