require('dotenv').config();
// const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('Tour routes', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tours', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  // beforeAll(() => {
  //   return connect();
  // });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a tour', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Best Little Whore-House in PDX',
        activities: ['fire-breathing', 'feats of strength', 'juggling'],
        launchdate: new Date(),
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
      .then(createdTour => {
        expect(createdTour.body).toEqual(
          {
            title: 'Best Little Whore-House in PDX',
            activities: ['fire-breathing', 'feats of strength', 'juggling'],
            launchdate: expect.any(String),
            stops: [
              {
                location: 'Portland',
                weather: 'Sunny',
                attendance: 1,
                _id: expect.any(String)
              },
              {
                location: 'Seattle',
                weather: 'Rainy',
                attendance: 5,
                _id: expect.any(String)
              }
            ],
            _id: expect.any(String),
            __v: 0
          });
      });
  });
});
