// const Tour = require('../../lib/models/Tour');
const request = require('supertest');
const app = require('../../lib/app');

describe('tour routes tests', () => {
  it('creates a tour', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Magic Mystery Tour',
        activities: ['dancing', 'singing', 'juggling'],
        launchDate: Date.now(),
        stops: []
      })
      .then(results => {
        expect(results.body).toEqual({
          title: 'Magic Mystery Tour',
          activities: ['dancing', 'singing', 'juggling'],
          launchDate: Date.now(),
          stops: [] 
        });
      });

  });

});
