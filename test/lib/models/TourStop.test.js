const Stop = require('../../../lib/Model/TourStop');
const mongoose = require('mongoose');
const getWeather = require('../../../lib/services/weather');
jest.mock('../../../lib/services/weather.js');


describe('Stop Model', ()=>{
    it('it has location, weather, attendance', ()=>{
        return getWeather()
            .then(weather => {
                console.log('weather', weather);
                const { latt_long, currentWeather } = weather;
                console.log('latlong', latt_long);
                const stop = new Stop({
                    tour: mongoose.Types.ObjectId(),
                    location: { cordinates:latt_long },
                    weather: { weather: currentWeather },
                    attendance:900
                });
                // const stopToJson = stop.toJSON();
                // expect(stopToJson._id).toEqual((expect.any(Object)));
                // expect(stopToJson.attendance).toEqual(900),
                // expect(stopToJson.location).toEqual({ cordinates: '19.431900,-99.132851' });
                // expect(stopToJson.tour).toEqual(expect.any(Object));
                // expect(stopToJson.weather).toEqual({ weather: 'Heavy Cloud' });
                
                expect(stop.toJSON()).toEqual({
                    _id:expect.any(Object),
                    attendance:900,
                    location:  { cordinates: '19.431900,-99.132851' }, //good
                    tour: expect.any(Object),
                    weather: ({ weather: 'Heavy Cloud' })
                });  
              
            });
   
    });
});
