require('../data-helper');
const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/Models/Tour');

describe('tour routes', () => {
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

  it('gets all tours', () => {
    return Tour
      .create(tour)
      .then(() => {
        return request(app)
          .get('/tours')
          .then(tour => {
            expect(tour.body).toHaveLength(1);
          });
      });
  });

  it('gets a tour by id', () => {
    return Tour
      .create(tour)
      .then(created => {
        return request(app)
          .get(`/tours/${created._id}`)
          .then(tour => {
            expect(tour.body).toEqual({
              title: 'stuff i want to eat',
              activities: ['eating', 'walking', 'more eating'],
              stops: [],
              launchDate: expect.any(String),
              _id: expect.any(String),
            });
          });
      });
  });

  it.only('adds a stop to a tour', () => {
    return request(app)
      .post('/tours')
      .send(tour)
      .then(res => {
        return request(app)
          .post(`/tours/${res.body._id}/stops`)
          .send(stop);
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'stuff i want to eat',
          activities: ['eating', 'walking', 'more eating'],
          launchDate: expect.any(String),
          _id: expect.any(String),
          stops: [{
            location: {
              lat: 44.44,
              lon: 123.45
            },
            attendance: 2,
            weather: {
              temp_max: expect.any(Number),
              temp_min: expect.any(Number),
              description: expect.any(String)
            }
          }],
        });
      });
  });

});


