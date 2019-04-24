require('dotenv').config();
const { Router } = require('express');
const Tour = require('../models/Tour');
const fetchWeather = require('../middleware/meta-weather-api');



module.exports = Router()
  .post('/', fetchWeather, (req, res, next) => {
    const {
      title,
      activities,
      launchDate,
      stops
    } = req.body;
    console.log(req.body);
    Tour.create({ title, activities, launchDate, stops })
      .then(createdTour => res.send(createdTour))
      .catch(next);
      
  });
