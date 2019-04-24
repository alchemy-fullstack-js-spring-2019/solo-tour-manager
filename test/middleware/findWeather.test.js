const getWeather = require('../../lib/middleware/findWeather');

describe('Weather test', () => {
  it('gets weather from lat/long', () => {
    const req = {
      body: {
        latLong: {
          lat: 36.96,
          long: -122.02
        }
      }
    };
    
    const res = {};
    const next = () => {
      expect(req.weather.predictability).toEqual(68);
    };

    getWeather(req, res, next);
  });
});
