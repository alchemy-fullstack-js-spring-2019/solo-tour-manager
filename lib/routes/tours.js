const { Router } = require('express');
const Tour = require('../models/Tour');
const Stop = require('../models/Stop');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      activities,
      launchdate,
      stops
    } = req.body;
    Tour
      .create({ title, activities, launchdate, stops })
      .then(createdTour => {
        res.send(createdTour);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tour.find()
      .populate('stops')
      .lean()
      .then(tours => {
        res.send(tours);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tour.findById(req.params.id)
      .populate('stops')
      .lean()
      .then(tour => {
        console.log('this is for tour', tour);
        res.send(tour);
      })
      .catch(next);
  })

  .post('/:id/stops', (req, res, next) => {
    const { location, weather, attendance } = req.body;

    Stop
      .create({ location, weather, attendance })
      .then(createdStop => {
        return Tour
          .findById(req.params.id)
          .then(foundTour => {
            foundTour.stops.push(createdStop._id);
            foundTour.save(() => {
              console.log('post save', foundTour)
              return res.send(createdStop);
            });
          });
      })
      .catch(next);
  });
