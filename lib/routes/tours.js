const { Router } = require('express');
const Tour = require('../models/Tour');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
      launchdate,
      stops,
      weather,
      attendance
    } = req.body;
    console.log(req.body);
    Tour
      .create({ title, activities, launchdate, stops, weather, attendance })
      .then(createdTour => {
        res.send(createdTour);
      })
      .catch(next);
  });
