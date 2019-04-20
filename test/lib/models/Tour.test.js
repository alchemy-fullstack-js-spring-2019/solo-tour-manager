const Tour = require('../../../lib/Model/Tour.js');
const mongoose = require('mongoose');

describe('Tour mobel', ()=>{
    const date = new Date;
    it('has title, activities, and a date', ()=>{
   
        const tour = new Tour({ title:'first tour',
            activities: ['poledancing', 'trapese'],
            date : date });

        expect(tour.toJSON()).toEqual({
            activities: ['poledancing', 'trapese'],
            title: 'first tour',
            _id: expect.any(mongoose.Types.ObjectId),
            date: date
        });               
    });
});

