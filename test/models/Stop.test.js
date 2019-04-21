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
});
