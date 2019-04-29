require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');

describe('tour routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/circus-tour', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const date = new Date;

  const newTour = {
    title: 'greatest show', 
    activities: ['games'], 
    launchDate: date, 
    stops: [{ 
      location: '36.974018,-122.030952',
      weather: {
        temp: null,
        weatherState: null
      },
      attendance: 100
    }]
  };

  it('can create a tour', () => {
    return request(app)
      .post('/api/v1/tours')
      .send(newTour)
      .then(result   => {
        expect(result.body).toEqual({
          title: 'greatest show',
          activities: ['games'],
          launchDate: date.toISOString(),
          stops: [{
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: expect.any(String),
              temp: expect.any(Number)
            },
            attendance: 100
          }],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all tours', () => {
    return Tour
      .create(newTour)
      .then(() => {
        return request(app)
          .get('/api/v1/tours');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tour by id', () => {
    return Tour
      .create(newTour)
      .then(createdTour => {
        return request(app)
          .get(`/api/v1/tours/${createdTour._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'greatest show',
          activities: ['games'],
          launchDate: date.toISOString(),
          stops: [{
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 100
          }],
          _id: expect.any(String),
        });
      });
  });

  it('can add a stop to the tour', () => {
    return Tour
      .create(newTour)
      .then(createdTour => {
        return request(app)
          .patch(`/api/v1/tours/${createdTour._id}/stops`)
          .send({
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 100
          });
      })
      .then(res => {
        expect(res.body).toEqual(({
          title: 'greatest show',
          activities: ['games'],
          launchDate: date.toISOString(),
          stops: [{
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 100
          },
          {
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 100
          }],
          _id: expect.any(String),
        }));
      });
  });

  it('can delete stops by id', () => {
    return Tour
      .create(newTour)
      .then(createdTour => {
        return request(app)
          .patch(`/api/v1/tours/${createdTour._id}/stops`)
          .send({
            location: '36.85,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 50
          });
      })
      .then(updatedTour => {
        return request(app)
          .delete(`/api/v1/tours/${updatedTour.body._id}/stops/${updatedTour.body.stops[1]._id}`);
      })
      .then(updatedTour => {
        expect(updatedTour.body).toEqual({
          title: 'greatest show',
          activities: ['games'],
          launchDate: date.toISOString(),
          stops: [{
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 100
          }],
          _id: expect.any(String)
        });
      });
  });
  it('can update the attendance of a stop', () => {
    return Tour
      .create(newTour)
      .then(createdTour => {
        return request(app)
          .patch(`/api/v1/tours/${createdTour._id}/stops/${createdTour.stops[0]._id}`)
          .send({ attendance: 45 });
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'greatest show',
          activities: ['games'],
          launchDate: date.toISOString(),
          stops: [{
            _id: expect.any(String),
            location: '36.974018,-122.030952',
            weather: {
              weatherState: null,
              temp: null
            },
            attendance: 45
          }],
          _id: expect.any(String)
        });
      });
  });
});
