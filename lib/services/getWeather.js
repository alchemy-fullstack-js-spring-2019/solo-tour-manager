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
      console.log('weatehr info', weatherInfo.body.consolidated_weather[0].the_temp);
      return weatherInfo.body;
    });
}

console.log('CHECK THIS OUT', getWeather(43.041809, -87.906837));

module.exports = getWeather;
