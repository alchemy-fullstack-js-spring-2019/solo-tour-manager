const request = require('./node_modules/superagent');
const Chance = require('chance');
let chance = new Chance;



module.exports = ()=>{
 
    return request
        .get(`https://www.metaweather.com/api/location/search/?lattlong=${chance.latitude()},${chance.longitude()}`)
        .then(res => {
            const result = JSON.parse(res.text);  
            const locationInfo = result[0];
            return Promise.resolve(locationInfo);
        }
        )
        .then(locationInfo => {  
            console.log('location info', locationInfo);     
            const { woeid, title, latt_long, } = locationInfo;
 
            return request
                .get(`https://www.metaweather.com/api/location/${woeid}`)
                .then(weather=>{
                    weather.text;
                    const weatherObject = JSON.parse(weather.text);
                    const currentWeather = weatherObject.consolidated_weather[0].weather_state_name;
                    return {
                        title,
                        latt_long,
                        currentWeather
                    };                 
                });
        });
};

