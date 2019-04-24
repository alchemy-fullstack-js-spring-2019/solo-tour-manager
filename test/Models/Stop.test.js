const Stop = require('../../lib/Models/Stop');
const mongoose = require('mongoose');

describe('stop schema test', () => {
  it('has location, weather, and attendance', () => {
    const stop = new Stop({
      location: {
        lat: 12345,
        lon: 4444,
      },
      weather: {
        temp_max: 60,
        temp_min: 40,
        description: 'cloudy'
      },
      attendance: 2
    });

    expect(stop.toJSON()).toEqual({
      location: {
        lat: 12345,
        lon: 4444,
      },
      weather: {
        temp_max: 60,
        temp_min: 40,
        description: 'cloudy'
      },
      attendance: 2,
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
