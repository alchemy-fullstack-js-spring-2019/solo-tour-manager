const Tour = require('../models/Tour');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, activities, launchDate, stops } = req.body;
    Tour
      .create({ title, activities, launchDate, stops })
      .then(createdTour => res.send(createdTour))
      .catch(next);
  });
