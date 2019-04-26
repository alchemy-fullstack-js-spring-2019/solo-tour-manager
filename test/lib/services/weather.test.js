const getWeather = require('../../../lib/services/weather');
jest.mock('../../../lib/services/weather.js');

describe('weather api', ()=>{
    it('gets random weather', ()=>{
        return getWeather()
            .then(weather=>{
                expect(weather).toEqual({
                    city:expect.any(String),
                    latt_long:expect.any(String),
                    currentWeather:expect.any(String)
                });
            });
      
    });
});
