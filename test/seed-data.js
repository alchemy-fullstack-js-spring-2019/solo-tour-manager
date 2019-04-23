const chance = require('chance').Chance();
const Tour = require('../lib/models/Tour');

module.exports = ({
  tourCount = 10
} = {}) => {
  const tours = [...Array(tourCount)]
    .map(() => ({
      title: chance.name(),
      activities: chance.profession(),
      launchDate: chance.date(),
      stops: chance.integer({ min: 0, max: 25 })
    }));

  return Tour
    .create(tours);
};
