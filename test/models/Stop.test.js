const mongoose = require('mongoose');
const Stop = require('../../lib/models/Stop');

describe('Stop model tests', () => {
  const date = new Date();

  it('creates a stop', () => {
    const stop = new Stop({
      location: {
        city: 'Portland',
        state: 'OR',
        zip: '97212',
      },
      weather: {
        applicable_date: date,
        weather_state_name: 'windy'
      },
      attendance: 500
    });
    expect(stop.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),      location: {
        city: 'Portland',
        state: 'OR',
        zip: '97212',
      },
      weather: {
        applicable_date: date,
        weather_state_name: 'windy'
      },
      attendance: 500
    });
  });
});
