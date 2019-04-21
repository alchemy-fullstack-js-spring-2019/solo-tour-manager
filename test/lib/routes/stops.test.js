const request = require('supertest');
const Tour = require('../../../lib/Model/Tour');
const app = require('../../../lib/app');
require('../data-helper');

describe('stops route', () => {
    it('has location, weather, and attendance', () => {
        const date = new Date;
        return Tour
            .create({
                title:'first tour',
                activities: ['poledancing', 'trapese'],
                date:date
            })
            .then(newTour => {
                const id = newTour._id;
                return request (app)
                    .post('/api/v1/stops')
                    .send({
                        tour: id,
                        attendance:600
                    });
            })
            .then(newStop => {
                expect(newStop.body).toEqual({
                    __v:0,
                    _id:expect.any(String),
                    attendance:600,
                    location:{ cordinates: expect.any(String) },
                    tour: expect.any(String),
                    weather:{ weather_state_abbr: expect.any(String) }

                });
            });
    });
    it('can find all stops', ()=>{
        const date = new Date;
        return Tour
            .create({
                title:'first tour',
                activities: ['poledancing', 'trapese'],
                date:date
            })
            .then(newTour => {
                const id = newTour._id;
                return request (app)
                    .post('/api/v1/stops')
                    .send({
                        tour: id,
                        attendance:600
                    });
            })
            .then(() => {
                return request(app)
                    .get('/api/v1/stops')
                    .then(foundStops => {
                        expect(foundStops.body.length).toEqual(2);
                    });
            });
    });
    it('can update stop by id', () => {
        const date = new Date;
        return Tour
            .create({
                title:'first tour',
                activities: ['poledancing', 'trapese'],
                date:date
            })
            .then(newTour => {
                const id = newTour._id;
                return request (app)
                    .post('/api/v1/stops')
                    .send({
                        tour: id,
                        attendance:600
                    });
            })
            .then(newStop => {
                const id = newStop.body._id;
                return request(app)
                    .patch(`/api/v1/stops/${id}`)
                    .send({ attendance:900 });
            })
            .then(updatedStop => {
                expect(updatedStop.body).toEqual({
                    
                    _id:expect.any(String),
                    attendance:900,
                    location:{ cordinates: expect.any(String) },
                    tour: expect.any(String),
                    weather:{ weather_state_abbr: expect.any(String) }
                });
            });
    });
    it.only('can delete stop by id', ()=>{
        const date = new Date;
        return Tour
            .create({
                title:'first tour',
                activities: ['poledancing', 'trapese'],
                date:date
            })
            .then(newTour => {
                const id = newTour._id;
                return request (app)
                    .post('/api/v1/stops')
                    .send({
                        tour: id,
                        attendance:600
                    });
            })
            .then(newStop => {
                const id = newStop.body._id;
                return request(app)
                    .delete(`/api/v1/stops/${id}`);
            })
            .then(()=>{
                return request(app)
                    .get('/api/v1/stops')
                    .then(foundStops => {
                        expect(foundStops.body.length).toEqual(0);
                    });
            });
    });   
})
;
