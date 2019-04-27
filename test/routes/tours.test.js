require('../data-helper');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('tour routes', () => {
  const id = new mongoose.Types.ObjectId;
  const date = new Date();
//   const testDate = date.toDateString();

  const stop = {
    location: {
      lat: 44.44,
      lon: 123.45
    },
    attendance: 2
  };

  const tour = {
    title: 'stuff i want to eat',
    activities: ['eating', 'walking', 'more eating'],
  };

  it('makes a new tour', () => {
    // const date = new Date();
    return request(app)
      .post('/tours')
      .send(tour)
      .then(tour => {
        expect(tour.body).toEqual({
          title: 'stuff i want to eat',
          activities: ['eating', 'walking', 'more eating'],
          stops: [],
          launchDate: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it.only('makes a new tour', () => {
    // const date = new Date();
    return request(app)
      .post('/tours')
      .send(tour)
      .then(tour => {
        expect(tour.body).toEqual({
          title: 'stuff i want to eat',
          activities: ['eating', 'walking', 'more eating'],
          stops: [],
          launchDate: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});

