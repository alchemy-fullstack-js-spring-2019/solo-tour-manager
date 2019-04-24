require('dotenv').config();
const { makeLLUrl, makeWoeidUrl } = require('../middleware/make-search-url');
const request = require('superagent');

function fetchWeather(req, res, next) {
  const url = makeLLUrl(req.body.stops[0].location);
  return request
    .get(url)
    .then(result => { 
      console.log(result.body[0].woeid, 'result/body/woeid');
      return result.body[0].woeid;
    
    })
    .then(newWoeid => {
      return makeWoeidUrl(newWoeid);
    })
    .then(res => {
      return request(res);
    })
    .then(res => {
      this.stops.weather.temp = res.body[0].the_temp;
      this.stops.weather.weatherState = res.body[0].weather_state_name;
    })
    .catch(next);
}


module.exports = fetchWeather;
