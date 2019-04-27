const { Router } = require('express');
const Tour = require('../Models/Tour');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
    } = req.body;
    console.log(req.body);
    Tour
      .create({ title, activities })
      .then(tour => res.send(tour))
      .catch(next);
  });
