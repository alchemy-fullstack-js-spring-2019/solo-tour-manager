const Tour = require('../../lib/models/Tour');
const mongoose = require('mongoose');

describe('Tour Model', () => {
  it('has title, activities, launchDate, and stops fields', () => {
    const date = new Date();
    const tour = new Tour({
      title: 'greatest show on earth',
      activities: ['games', 'fun stuff'],
      launchDate: date,
      stops: [{ 
        location: '36.974018,-122.030952', weather: { 
          weatherState: 'rainy', 
          temp: 26 
        }, 
        attendance: 145 
      }]
    });
    console.log(tour);
    expect(tour.toJSON()).toEqual({
      title: 'greatest show on earth',
      activities: ['games', 'fun stuff'],
      launchDate: date,
      stops: [{ _id: expect.any(mongoose.Types.ObjectId), location: '36.974018,-122.030952', weather: { weatherState: 'rainy', temp: 26 }, attendance: 145 }],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
