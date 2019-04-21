const { getWeather } = require('../services/metaweather-api');

module.exports = (req, res, next) => {
  const { lat, lon } = req.body;
  return getWeather(lat, lon)
    .then(weather => {
      req.body.location.woeid = weather.woeid;
      req.body.location.name = weather.title;
      req.body.weather.sunRise = weather.sun_rise;
      req.body.weather.sunSet = weather.sun_set;
      req.body.weather.weatherState = weather.consolidated_weather[0].weather_state_name;
      req.body.weather.temp = weather.consolidated_weather[0].the_temp;
      req.body.weather.humidity = weather.consolidated_weather[0].humidity;
      next();
    })
    .catch(next);
};
