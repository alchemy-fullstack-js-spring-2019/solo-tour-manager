const request = require('supertest');
const Stop = require('../../../lib/Model/Stop');
const stops = require('../../../lib/routes/stops');
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
                expect(newStop.body).toEqual('7');
            });
    });
})
;
