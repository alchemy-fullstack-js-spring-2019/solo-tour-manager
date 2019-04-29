const request = require('supertest');
const mongoose = require('mongoose');
const Tour = require('../../lib/models/Tour');

describe('Tour schema', () => {
  it('makes a tour', () => {
    const tour = new Tour({
      title: 'Titled',
      activities: ['drink', 'dance']
    });

    expect(tour.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Titled',
      activities: ['drink', 'dance'],
      launchDate: expect.any(Object),
      stops: []
    });
  });

  it('requires a title', () => {
    const tour = new Tour({});
    const errors = tour.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
  });
});
