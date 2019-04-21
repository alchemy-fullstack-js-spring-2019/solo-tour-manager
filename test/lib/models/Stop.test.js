const Stop = require('../../../lib/Model/Stop');
const mongoose = require('mongoose');

describe('Stop Model', ()=>{
    it('it has location, weather, attendance', ()=>{
        const stop = new Stop({
            tour
            location: { latitude:123, longitude:666 },
            weather: { weather_state_abbr:'sn' },
            attendance: 1255346
        });
        expect(stop.toJSON()).toEqual({
            location:{ latitude:123, longitude:666 },
            weather: { weather_state_abbr:'sn' },
            attendance: 1255346,
            _id:expect.any(mongoose.Types.ObjectId)
        });   
    });
});
