const request = require('superagent');

const BASE_URL = 'https://www.metaweather.com/api/location';

function getWeather(lat, lon) {
  return request
    .get(`${BASE_URL}/search/?lattlong=${lat},${lon}`)
    .then(apiRes => {
      return request
        .get(`${BASE_URL}/${apiRes.body[0].woeid}`);
    })
    .then(apiRes2 => {
      return apiRes2.body;
    });
}

module.exports = {
  getWeather
};
