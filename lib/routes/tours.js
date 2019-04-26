const Tour = require('../models/Tour');
const { Router } = require('express');
const getWeather = require('../../lib/utils/weatherAPI');

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
      .then(tour => res.send(tour))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour
      .find()
      .then(tours => res.send(tours))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tour
      .findById(req.params.id)
      .then(tour => res.send(tour))
      .catch(next);
  });
