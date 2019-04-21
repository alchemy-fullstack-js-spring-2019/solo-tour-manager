const request = require('superagent');
const Chance = require('chance');
let chance = new Chance;



function getWeather(){
    return request
        .get(`https://www.metaweather.com/api/location/search/?lattlong=${chance.latitude()},${chance.longitude()}`)
        .then(res => {
            const result = JSON.parse(res.text);  
            const locationInfo = result[0];
            return Promise.resolve(locationInfo);
        }
        )
        .then(locationInfo => {      
            const { woeid, title, latt_long, } = locationInfo;
 
            return request
                .get(`https://www.metaweather.com/api/location/${woeid}`)
                .then(weather=>{
                    weather.text;
                    const weatherObject = JSON.parse(weather.text);
                    const currentWeather = weatherObject.consolidated_weather[0].weather_state_name;
                    const weatherInfo = 
                    {
                        city: title,
                        latt_long,
                        currentWeather
                    };
                    return Promise.resolve(weatherInfo);
                });
        });
}
module.exports = getWeather;




