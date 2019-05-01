require('dotenv').config();
const { Router } = require('express');
const Stop = require('../models/Stop');
const findWeather = require('../../lib/middleware/findWeather');

module.exports = Router()
  .post('/', findWeather, (req, res, next) => {
    const {
      latLong,
      attendance
    } = req.body;

    const weatherGrab = req.weather;

    const weather = {
      state: weatherGrab.weather_state_name,
      max: weatherGrab.max_temp,
      min: weatherGrab.min_temp
    };

    Stop
      .create({ latLong, attendance, weather })
      .then(stopPost => {
        res.send(stopPost);
      })
      .catch(next);
  });
