const mongoose = require('mongoose');
const Tour = require('../../lib/models/Tour');

describe('Tour model tests', () => {
  it('creates a Tour with Title, Activities, launchDate, and stops', () => {
    const tour = new Tour({
      title: 'Amazing Circus',
      activities: [
        'juggling',
        'acrobatics',
        'fire-eating'
      ]
    });
    console.log(tour.toJSON());
    expect(tour.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Amazing Circus',
      activities: [
        'juggling',
        'acrobatics',
        'fire-eating'
      ],
      launchDate: expect.any(Date),
      stops: []
    });

  });

});
