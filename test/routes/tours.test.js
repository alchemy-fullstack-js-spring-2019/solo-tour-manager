require('dotenv').config();
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const Tour = require('../../lib/models/Tour');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('tour routes correctly', () => {
  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('posts a tour without stops', () => {
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'Spring Tour',
        activities: ['music', 'party']
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          activities: ['music', 'party'],
          launchDate: expect.any(String),
          'title': 'Spring Tour'
        });
      });
  });

});
