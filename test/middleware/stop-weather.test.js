const stopWeather = require('../../lib/middleware/stop-weather');

jest.mock('../../lib/services/metaweather-api.js');

describe('stop weather middleware', () => {
  it('returns data we are looking for', () => {
    const req = {
      body: {
        location: {
          lat: 37.77,
          lon: -122.41
        },
        attendance: 1
      }
    };

    return stopWeather(req, {}, () => { })
      .then(() => {
        expect(req.body).toEqual({
          location: {
            lat: 37.77,
            lon: -122.41,
            woeid: 2487956,
            name: 'San Francisco'
          },
          weather: {
            sunRise: '2019-04-21T06:26:32.195043-07:00',
            sunSet: '2019-04-21T19:49:55.671339-07:00',
            weatherState: 'Light Cloud',
            temp: 14.195,
            humidity: 72
          },
          attendance: 1
        });
      });
  });
});
