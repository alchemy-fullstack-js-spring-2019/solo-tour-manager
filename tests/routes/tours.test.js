const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');

describe('tour routes', () => {
  it('can create a tour', () => {
    const date = new Date;
    return request(app)
      .post()
      .send({ title: 'greatest show', activities: ['games'], launchDate: date, stops: [{ 
        location: '36.974018,-122.030952', 
        attendance: 100
      }]
      })
      .then(createdTour => {
        expect(createdTour.body).toEqual({
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
        });
      });
  });
});
