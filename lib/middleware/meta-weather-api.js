require('dotenv').config();
const { makeLLUrl, makeWoeidUrl } = require('../middleware/make-search-url');
const request = require('superagent');

function fetchWeather(req, res, next) {
  const url = makeLLUrl(req.body.stops[0].location);
  return request
    .get(url)
    .then(result => {
      return result.body[0].woeid;
    })
    .then(woeid => {
      return makeWoeidUrl(woeid);
    })
    .then(url => {
      request
        .get(url)
        .then(res => {
          req.body.stops[0].weather.temp = res.body.consolidated_weather[0].the_temp; 
          req.body.stops[0].weather.weatherState = res.body.consolidated_weather[0].weather_state_name;
          next();
        });
    })
    .catch(next);
}

module.exports = fetchWeather;
