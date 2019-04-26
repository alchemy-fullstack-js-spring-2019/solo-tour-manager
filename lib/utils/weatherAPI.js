const request = require('superagent');

function getWeather(latt, long) {
  return request
    .get(`/api/location/search/?lattlong=${latt},${long}`)
    .then(res => res.body);
}

module.exports = getWeather;
