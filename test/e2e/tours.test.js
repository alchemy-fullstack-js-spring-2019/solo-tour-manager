require('dotenv').config();
require('../connect-to-db');
// const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

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
      .then(results => {
        expect(results.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          title: 'Magic Mystery Tour',
          activities: ['dancing', 'singing', 'juggling'],
          launchDate: expect.any(String),
          stops: []
        });
      });
  });
});
