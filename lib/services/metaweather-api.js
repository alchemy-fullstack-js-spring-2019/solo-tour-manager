const request = require('superagent');

const BASE_URL = 'https://www.metaweather.com/api/location';

function getWeather(lat, lon) {
  return request
    .get(`${BASE_URL}/search/?lattlong=${lat},${lon}`)
    .then(apiRes => {
      // req.body.woeid = apiRes.body[0].woeid;
      return request
        .get(`${BASE_URL}/${apiRes.body[0].woeid}`);
    })
    .then(apiRes2 => {
      return apiRes2.body;
      // req.body.sunRise = apiRes.body.sun_rise;
      // req.body.sunSet = apiRes.body.sun_set;
      // req.body.weatherState = apiRes.body.consolidated_weather[0].weather_state_name;
      // req.body.temp = apiRes.body.consolidated_weather[0].the_temp;
      // req.body.humidity = apiRes.body.consolidated_weather[0].humidity;
      // next();
    });
}

module.exports = {
  getWeather
};
