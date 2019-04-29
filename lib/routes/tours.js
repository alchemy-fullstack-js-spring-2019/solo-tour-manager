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
  })
  .patch('/:id/stops', (req, res, next) => {
    Tour
      .findOneAndUpdate(req.params._id, { $push: { stops: req.body } }, { new: true })
      .select({
        __v: false
      })
      .then(updatedTour => {
        res.send(updatedTour);
      })

      .catch(next);
  })
  .delete('/:id/stops/:stopId', (req, res, next) => {
    Tour
      .findByIdAndUpdate(req.params.id, { $pull: { 'stops': { _id: req.params.stopId } } }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(deletedStop => {
        res.send(deletedStop);
      })
      .catch(next);
  })
  .patch('/:id/stops/:stopId', (req, res, next) => {
    Tour.find({ stops: { $elemMatch: {  _id: req.params.stopId } } })
      .then(found => {
        Tour
          .findByIdAndUpdate({ '_id': req.params.id, 'stop.id': req.params.stopId }, { $set: { 'stops': { attendance:  req.body.attendance, location: found[0].stops[0].location, weather: found[0].stops[0].weather } } }, { new: true })
          .select({ 
            __v: false
          })
          .lean()
          .then(updatedStop => {
            res.send(updatedStop);
          })
          .catch(next);
      });
    
  });
