const getWeather = require('../services/getWeather');

module.exports = (req, res, next) => {
  const { lat, lon } = req.body.location;
  return getWeather(lat, lon)
    .then(weatherInfo => {
      req.body.location.name = weatherInfo.title;
      req.body.location.woeid = weatherInfo.woeid;
      req.body.weather = {};
      req.body.weather.weather_state_name = weatherInfo.consolidated_weather[0].weather_state_name;
      req.body.weather.temp = weatherInfo.consolidated_weather[0].the_temp;
      next();
    })
    .catch(next);
};
