const request = require('supertest');
const Tour = require('../../lib/models/Tour');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('tour routes correctly', () => {
  // beforeAll(() => {
  //   return 
  // });
  it('posts a tour', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Spring Tour',
        activities: ['music', 'party']
      });
  });

});
