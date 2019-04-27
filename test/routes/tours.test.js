require('../data-helper');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('tour routes', () => {
  it.only('makes a new tour', () => {
    const id = new mongoose.Types.ObjectId;
    return request(app)
      .post('/tours')
      .send({
        title: 'stuff i want to eat',
        activities: ['eating', 'walking', 'more eating'],
        stops: [id]
      })
      .then(tour => {
        expect(tour.body).toEqual({
          title: 'stuff i want to eat',
          activities: ['eating', 'walking', 'more eating'],
          launchDate: expect.any(Date),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

