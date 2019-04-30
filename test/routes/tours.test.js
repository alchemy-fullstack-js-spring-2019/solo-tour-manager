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
          'title': 'Spring Tour',
          stops: []
        });
      });
  });

  it('gets a list of tours', () => {
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'dude',
        activities: ['drink', 'beer']
      })
      .then(() => {
        return request(app)
          .get('/planner/tours');
      })
      .then(list => {
        expect(list.body).toHaveLength(1);
      });
  });

  it('gets a single tour by ID', () => {
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'dude3',
        activities: ['drink', 'beer']
      })
      .then(created => {
        return request(app)
          .get(`/planner/tours/${created.body._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({
          launchDate: expect.any(String),
          title: 'dude3',
          activities: ['drink', 'beer'],
          _id: expect.any(String),
          __v: 0,
          stops: []
        });
      });
  });

  it('adds a stop to a tour by ID', () =>{
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'dude3',
        activities: ['drink', 'beer']
      })
      .then(createdTour => {
        return request(app)
          .post(`/planner/tours/${createdTour.body._id}/stops`)
          .send({
            tour: createdTour.body._id,
            latLong: {
              lat: 36.96,
              long: -122.02 
            }, 
            attendance: 10
          })
          .then(stopAdded => {
            expect(stopAdded.body.stops).toHaveLength(1);
          });
      });
      
  });

  it('deletes a stop to by stopID', () =>{
    return request(app)
      .post('/planner/tours')
      .send({
        title: 'dude4',
        activities: ['drink', 'beer']
      })
      .then(createdTour => {
        return request(app)
          .post(`/planner/tours/${createdTour.body._id}/stops`)
          .send({
            tour: createdTour.body._id,
            latLong: {
              lat: 36.96,
              long: -122.02 
            }, 
            attendance: 10
          })
          .then(stopAdded => {
            return request(app)
              .delete(`/planner/tours/${createdTour.body._id}/stops/${stopAdded.body.stops[0]._id}`)
              .then(deleted => {
                expect(deleted.body._id).toEqual(stopAdded.body.stops[0]._id);
              });
          });
      });
      
  });

});
