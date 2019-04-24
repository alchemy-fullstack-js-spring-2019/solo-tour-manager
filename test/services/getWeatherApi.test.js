const getWeatherApi = require('../../lib/services/getWeatherApi');
jest.mock('../../lib/services/getWeatherApi');

describe('get weather test', () => {
  it('gets the weather', () => {
    const location = {
      name: 'Seattle',
      lat: 47.608013,
      lon: -122.335167,
    };
    
    return getWeatherApi(location.lat, location.lon)
      .then(res => {
        expect(res.weather[0].description).toEqual(expect.any(String));
      });
  });
});
