const { Router } = require('express');
const Tour = require('../Models/Tour');
const Stop = require('../Models/Stop');
const getWeather = require('../services/getWeatherApi');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
    } = req.body;
    Tour
      .create({ title, activities })
      .then(tour => res.send(tour))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tour
      .find()
      .then(list => res.send(list))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Tour
      .findById(req.params.id)
      .select({ __v: false })
      .lean()
      .then(tour => res.send(tour))
      .catch(next);
  })

  .post('/:id/stops', getWeather, (req, res, next) => {
    const {
      location,
      weather,
      attendance
    } = req.body;

    Stop
      .create({ location, attendance, weather })
      .then(stop => res.send(stop))
      .catch(next);
  })

;
