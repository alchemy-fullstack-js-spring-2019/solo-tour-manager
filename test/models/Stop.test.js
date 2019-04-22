const mongoose = require('mongoose');
const Stop = require('../../lib/models/Stop');

describe('Stop model', () => {
  const testSunRise = new Date();
  const testSunSet = new Date();
  it('has a location, weather, and attendance', () => {
    const stop = new Stop({
      location: {
        lat: 37.77,
        lon: -122.41,
        name: 'San Francisco',
        woeid: 2487956
      },
      weather: {
        sunRise: testSunRise,
        sunSet: testSunSet,
        weatherState: 'Light Cloud',
        temp: 13.02,
        humidity: 82
      },
      attendance: 5
    });

    expect(stop.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      location: {
        lat: 37.77,
        lon: -122.41,
        name: 'San Francisco',
        woeid: 2487956
      },
      weather: {
        sunRise: testSunRise,
        sunSet: testSunSet,
        weatherState: 'Light Cloud',
        temp: 13.02,
        humidity: 82
      },
      attendance: 5
    });
  });

  it('has a required lat and lon', () => {
    const stop = new Stop({
      location: {
        name: 'San Francisco',
        woeid: 2487956
      },
      weather: {
        sunRise: testSunRise,
        sunSet: testSunSet,
        weatherState: 'Light Cloud',
        temp: 13.02,
        humidity: 82
      },
      attendance: 5
    });

    const error = stop.validateSync().errors;
    expect(error['location.lon'].message).toBe('Path `location.lon` is required.');
    expect(error['location.lat'].message).toBe('Path `location.lat` is required.');
  });

  it('has a minimum attendance', () => {
    const stop = new Stop({
      location: {
        lat: 37.77,
        lon: -122.41,
        name: 'San Francisco',
        woeid: 2487956
      },
      weather: {
        sunRise: testSunRise,
        sunSet: testSunSet,
        weatherState: 'Light Cloud',
        temp: 13.02,
        humidity: 82
      },
      attendance: 0
    });

    const error = stop.validateSync().errors;
    expect(error.attendance.message).toBe('Path `attendance` (0) is less than minimum allowed value (1).');
  });
});
