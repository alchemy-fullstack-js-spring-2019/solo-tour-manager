const request = require('supertest');
const mongoose = require('mongoose');
const Stop = require('../../lib/models/Stop');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');


describe('stop model', () => {
  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can post all fields', () => {
    return request(app)
      .post('/planner/stops')
      .send(
        { 
          latLong: {
            lat: 36.96,
            long: -122.02 
          }, 
          attendance: 10
        })
      .then(createdStop => {
        expect(createdStop.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          attendance: 10,
          latLong: {
            lat: 36.96,
            long: -122.02,
          },
          weather: {
            max: 19.575000000000003,
            min: 12.885,
            state: 'Heavy Cloud',
          }
        });
      });
  });
});
