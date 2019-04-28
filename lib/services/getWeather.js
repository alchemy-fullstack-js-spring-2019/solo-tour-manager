const request = require('superagent');

const BASE_URL = 'https://www.metaweather.com/api/location';

function getWeather(lat, lon) {
  return request
    .get(`${BASE_URL}/search/?lattlong=${lat},${lon}`)
    .then(apiStuff => {
      return request
        .get(`${BASE_URL}/${apiStuff.body[0].woeid}`);
    })
    .then(weatherInfo => {
      return weatherInfo.body;
    });
}


module.exports = getWeather;
