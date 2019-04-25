require('dotenv').config();
const { makeLLUrl, makeWoeidUrl } = require('../middleware/make-search-url');
const request = require('superagent');

async function fetchWeather(req, res, next) {
  const url = makeLLUrl(req.body.stops[0].location);
  const firstFetch = await request.get(url);
  const woeid = firstFetch.body[0].woeid;
  const newURL = makeWoeidUrl(woeid);
  const fetchData = await request(newURL);
  req.body.stops[0].weather.temp = fetchData.body.consolidated_weather[0].the_temp; 
  req.body.stops[0].weather.weatherState = fetchData.body.consolidated_weather[0].weather_state_name;
  next();
}

module.exports = fetchWeather;
