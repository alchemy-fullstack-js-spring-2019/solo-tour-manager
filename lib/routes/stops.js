const { Router } = require('express');
const Stop = require('../Models/Stop');
const getWeather = require('../services/getWeatherApi');

module.exports = Router()
  .post('/:id/stops', getWeather(), (req, res, next) => {
    const {
      location,
      weather,
      attendance
    } = req.body;

    Stop
      .create({ location, attendance, weather })
      .then(stop => res.send(stop))
      .catch(next);
  });

