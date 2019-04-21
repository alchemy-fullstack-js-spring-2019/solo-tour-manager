const { Router } = require('express');
const Tour = require('../models/Tour');
const Stop = require('../models/Stop');
const stopWeather = require('../middleware/stop-weather');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, activities, launchDate, stops } = req.body;
    Tour
      .create({ title, activities, launchDate, stops })
      .then(createdTour => res.send(createdTour))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Tour
      .find()
      .lean()
      .then(tours => res.send(tours))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Tour
      .findById(req.params.id)
      .populate('stops')
      .lean()
      .then(foundTour => res.send(foundTour))
      .catch(next);
  })

  .post('/:id/stops', stopWeather, (req, res, next) => {
    const { location, weather, attendance } = req.body;
    Stop
      .create({ location, weather, attendance })
      .then(createdStop => {
        return Promise.all([
          Tour
            .findById(req.params.id)
            .then(foundTour => {
              foundTour.stops.push(createdStop._id);
              console.log(foundTour);
              return;
            }),
          Promise.resolve(createdStop)
        ]);
      })
      .then(([, createdStop]) => res.send(createdStop))
      .catch(next);
  });
