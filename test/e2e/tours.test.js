require('../connect-db');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('tours routes', () => {
  it('can create a tour', () => {
    const testLaunchDate = new Date();
    const stop1 = new mongoose.Types.ObjectId;
    const stop2 = new mongoose.Types.ObjectId;

    const testTour = {
      title: 'Never Ending Tour',
      activities: ['listening', 'swaying', 'Bob Dylan'],
      launchDate: testLaunchDate,
      stops: [stop1, stop2]
    };
    return request(app)
      .post('/tours')
      .send(testTour)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Never Ending Tour',
          activities: ['listening', 'swaying', 'Bob Dylan'],
          launchDate: testLaunchDate.toISOString(),
          stops: [stop1.toString(), stop2.toString()],
          __v: 0
        });
      });
  });
});
