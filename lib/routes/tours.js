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
      });
  });
