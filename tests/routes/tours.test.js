require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
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

  
  it('can create a tour', () => {
    const date = new Date;
    return request(app)
      .post('/api/v1/tours')
      .send({
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
      })
      .then(result   => {
        console.log(result.body);
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
});
