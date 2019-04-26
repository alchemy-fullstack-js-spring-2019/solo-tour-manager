const weatherMiddlware = require('../../../lib/middleware/weather');
jest.mock('../../../lib/services/weather.js');



describe('weather middleware', ()=>{
    it.only('provides current weather and location', done => {
        const req = {};
        const res = {};
        const next = ()=>{
            expect(req.weather).toEqual({
                city:expect.any(String),
                latt_long:expect.any(String),
                currentWeather:expect.any(String)      
            });
            done();
        };
        weatherMiddlware(req, res, next);
    });
})
;
