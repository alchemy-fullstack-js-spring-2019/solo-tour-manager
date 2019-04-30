const { Router } = require('express');
const Tour = require('../models/Tour');
const Stop = require('../models/Stop');
const findWeather = require('../middleware/findWeather');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
      launchDate
    } = req.body;

    Tour
      .create({ title, activities, launchDate })
      .then(tourPost => {
        res.send(tourPost);
      })
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
      .then(found => res.send(found))
      .catch(next);
  })
  .post('/:id/stops', findWeather, (req, res, next) => {
    const { latLong, attendance } = req.body;
    const tourId = req.params.id;
    const weather = {
      state: req.weather.weather_state_name,
      max: req.weather.max_temp,
      min: req.weather.min_temp
    };

    Stop
      .create({ tourId, weather, latLong, attendance })
      .then(createdStop => {
        return Tour
          .findById(req.params.id)
          .then(tour => {
            tour.stops.push(createdStop);
            tour.save(() => {
              return res.send(tour);
            });
          })
          .catch(next);
      });
  })

  .delete('/:id/stops/:stopId', (req, res, next) => {
    console.log(req.params.stopId);
    Stop
      .findByIdAndDelete(req.params.stopId)
      .then(deleted => {
        res.send(deleted);
      });
      
  });


