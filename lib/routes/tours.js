const { Router } = require('express');
const Tour = require('../models/Tour');

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
      .catch(next)

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
  });
