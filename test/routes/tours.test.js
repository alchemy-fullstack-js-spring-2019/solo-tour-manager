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
  
  it('posts a tour', () => {
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'Spring Tour',
        activities: ['music', 'party']
      })
      .then(res => {
        expect(res.body).toEqual('');
      });
  });

  // it('')
});
