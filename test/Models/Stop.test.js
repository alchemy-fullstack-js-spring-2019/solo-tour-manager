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

  it('has a required lat/lon and attendance', () => {
    const stop = new Stop({
      location: 'texas',
      weather: {
        temp_max: 60,
        temp_min: 40,
        description: 'cloudy'
      },
      attendance: 0
    });

    const errors = stop.validateSync().errors;
    expect(errors.attendance.message).toEqual('Path `attendance` (0) is less than minimum allowed value (1).');
    expect(errors['location.lon'].message).toEqual('Path `location.lon` is required.');
    expect(errors['location.lat'].message).toEqual('Path `location.lat` is required.');
  });
});
