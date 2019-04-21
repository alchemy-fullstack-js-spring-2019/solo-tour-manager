require('../connect-db');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');

describe('tours routes', () => {
  const testLaunchDate = new Date();
  const stop1 = new mongoose.Types.ObjectId;
  const stop2 = new mongoose.Types.ObjectId;

  const testTour = {
    title: 'Never Ending Tour',
    activities: ['listening', 'swaying', 'Bob Dylan'],
    launchDate: testLaunchDate,
    stops: [stop1, stop2]
  };

  it('can create a tour', () => {
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

  it('can get all tours', () => {
    return Tour.create(testTour)
      .then(() => {
        return request(app)
          .get('/tours');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          title: 'Never Ending Tour',
          activities: ['listening', 'swaying', 'Bob Dylan'],
          launchDate: testLaunchDate.toISOString(),
          stops: [stop1.toString(), stop2.toString()],
          __v: 0
        });
      });
  });

  it('can get a tour by id', () => {
    return Tour.create(testTour)
      .then(createdTour => {
        return Promise.all([
          Promise.resolve(createdTour),
          request(app)
            .get(`/tours/${createdTour._id}`)
        ]);
      })
      .then(([createdTour, foundTour]) => {
        expect(foundTour.body).toEqual({ 
          _id: expect.any(String),
          title: createdTour.title,
          activities: ['listening', 'swaying', 'Bob Dylan'],
          launchDate: testLaunchDate.toISOString(),
          stops: [stop1.toString(), stop2.toString()],
          __v: 0
        });
      });
  });
});
