const { Router } = require('express');
const Tour = require('../models/Tour');
// const fetchWeather = require('../middleware/meta-weather-api');


module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
      launchDate,
      stops
    } = req.body;
    Tour
      .create({ title, activities, launchDate, stops })
      .then(createdTour => {
        res.send(createdTour);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(foundTours => {
        res.send(foundTours);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tour
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundTour => {
        res.send(foundTour);
      })
      .catch(next);
  });
