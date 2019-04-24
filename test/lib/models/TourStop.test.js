const TourStop = require('../../../lib/Model/TourStop');

const mongoose = require('mongoose');
const getWeather = require('../../../lib/services/weather');
jest.mock('../../../lib/services/weather.js');


describe('Stop Model', ()=>{
    it('it has location, weather, attendance', ()=>{


        return getWeather()
            .then(weather => {
                const { latt_long, currentWeather } = weather;   
                const stop = new TourStop({
                    location: { cordinates:latt_long },
                    weather: 'Heavy Cloud',
                    attendance:900
                });
  
                
                expect(stop.toJSON()).toEqual({
                    _id:expect.any(mongoose.Types.ObjectId),
                    attendance:900,
                    location:  { cordinates: '19.431900,-99.132851' }, //good
                    //tour: expect.any(mongoose.Types.ObjectId), not needed
                    weather: currentWeather
                });  
              
            });
   
    });
});
