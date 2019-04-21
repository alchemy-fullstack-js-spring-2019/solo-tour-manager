require('../connect-db');
const request = require('supertest');
// const mongoose = require('mongoose');
const app = require('../../lib/app');
// const Tour = require('../../lib/models/Tour');
// const Stop = require('../../lib/models/Stop');

jest.mock('../../lib/services/metaweather-api.js');

describe('tours routes', () => {
  const testLaunchDate = new Date();

  const testTour = {
    title: 'Never Ending Tour',
    activities: ['listening', 'swaying', 'Bob Dylan'],
    launchDate: testLaunchDate
  };

  const testStop = {
    location: {
      lat: 37.77,
      lon: -122.41
    },
    attendance: 1
  };

  it('can add a stop', () => {
    return request(app)
      .post('/tours')
      .send(testTour)
      .then(res => {
        return Promise.all([
          Promise.resolve(res.body),
          request(app)
            .post(`/tours/${res.body._id}/stops`)
            .send(testStop)
        ]);
      })
      .then(([, res]) => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'Never Ending Tour',
          activities: ['listening', 'swaying', 'Bob Dylan'],
          launchDate: testLaunchDate.toISOString(),
          stops: [
            {
              _id: expect.any(String),
              __v: 0,
              location: {
                lat: 37.77,
                lon: -122.41,
                woeid: 2487956,
                name: 'San Francisco'
              },
              weather: {
                sunRise: '2019-04-21T13:26:32.195Z',
                sunSet: '2019-04-22T02:49:55.671Z',
                weatherState: 'Light Cloud',
                temp: 14.195,
                humidity: 72
              },
              attendance: 1
            }
          ]
        });
      });
    // return createdTour;
  });
  // .then(createdTour => {
  //   return request(app)
  //     .get(`/tours/${createdTour._id}`);
  // })
  // .then(res => {
  //   expect(res.body).toEqual({
  //     _id: expect.any(String),
  //     __v: 0,
  //     title: 'Never Ending Tour',
  //     activities: ['listening', 'swaying', 'Bob Dylan'],
  //     launchDate: testLaunchDate,
  //     stops: [
  //       {
  //         _id: expect.any(String),
  //         __v: 0,
  //         location: {
  //           lat: 37.77,
  //           lon: -122.41,
  //           woeid: 2487956,
  //           name: 'San Francisco'
  //         },
  //         weather: {
  //           sunRise: '2019-04-21T13:26:32.195Z',
  //           sunSet: '2019-04-22T02:49:55.671Z',
  //           weatherState: 'Light Cloud',
  //           temp: 14.195,
  //           humidity: 72
  //         },
  //         attendance: 1
  //       }
  //     ]
  //   });
  // });
  // });

});

// "sunRise": "2019-04-21T13:26:32.195Z",
// "sunSet": "2019-04-22T02:49:55.671Z",

// sun_rise: '2019-04-21T06:26:32.195043-07:00',
// sun_set: '2019-04-21T19:49:55.671339-07:00',
