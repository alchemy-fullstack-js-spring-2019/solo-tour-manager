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

  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  
  // beforeAll(() => {
  //   return connect();
  // });

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

  it('finds and returns all tours', () => {
    return request(app)
      .get('/tours')
      .then(res => {
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('finds and returns a tour by id', () => {
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
        return request(app)
          .get(`/tours/${createdTour.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
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
          _id: expect.any(String)
        });
      });
  });
});
