require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');

describe('stop routes', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tours', {
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

  beforeAll(() => {
    return connect();
  });

  it('can create a stop', () => {
    return request(app)
      .post('/stops')
      .send({
        location: 'PDX',
        weather: {
          applicable_date: '2019-04-27T07:00:00.000Z',
          weather_state_name: 'Sunny'
        },
        attendance: 200
      })
      .then(res => {
        expect(res.body).toEqual({
          location: 'PDX',
          weather: {
            applicable_date: '2019-04-27T07:00:00.000Z',
            weather_state_name: 'Sunny'
          },
          attendance: 200,
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  it('can create a stop by tour id', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Best Little Whore-House in PDX',
        activities: ['fire-breathing', 'feats of strength', 'juggling'],
        launchdate: new Date('1995'),
        stops: [
          {
            location: 'Portland',
            weather: 'Sunny',
            attendance: 1
          },
          {
            location: 'Seattle',
            weather: 'Rainy',
            attendance: 5
          }
        ]
      })
      })
      .then(res => request(app).get(`/tours/${res.body._id}/stops`))
  })


});
