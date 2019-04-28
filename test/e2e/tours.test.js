require('dotenv').config();
require('../connect-to-db');
const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');

describe('tour routes tests', () => {
  const launchDate = Date.now();
  it('creates a tour', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Magic Mystery Tour',
        activities: ['dancing', 'singing', 'juggling'],
        launchDate
      })
      .then(tour => {
        return request(app)
          .post('/stops')
          .send({
            location: {
              city: 'Portland',
              state: 'Oregon',
              zip: '97212'
            },
            weather: {

            },
            attendance: 500
          });
      })
      .then(results => {
        console.log(results.body);
        expect(results.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          title: 'Magic Mystey Tour',
          activities: ['dancing', 'singing', 'juggling'],
          launchDate: expect.any(String),
          stops: []
        });
      });
  });

  it('gets a list of tours', () => {
    return Tour.create({
      title: 'Funny Little Dancing Tour',
      activities: ['dancing', 'comedy'],
      launchDate
    })
      .then(() => {
        return request(app)
          .get('/tours');
      })
      .then(tours => {
        expect(tours.body).toHaveLength(1);
      });
  });

  it('gets a tour by id', () => {
    return Tour.create({ 
      title: 'Funny Little Dancing Tour',
      activities: ['dancing', 'comedy'],
      launchDate
    })
      .then(tour => {
        return request(app)
          .get(`/tours/${tour._id}`)
          .then(results => {
            expect(results.body).toEqual({
              __v: 0,
              _id: expect.any(String),
              title: 'Funny Little Dancing Tour',
              activities: ['dancing', 'comedy'],
              launchDate: expect.any(String),
              stops: []
            });
          });
      });
  });
  
});
