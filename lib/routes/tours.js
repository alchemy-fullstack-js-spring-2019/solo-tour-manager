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
    Tour
      .create({ title, activities, launchdate, stops, weather, attendance })
      .then(createdTour => {
        res.send(createdTour);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tour.find()
      .select({
        __v: false
      })
      .lean()
      .then(tours => {
        res.send(tours);
      })
      .catch(next);
  });
