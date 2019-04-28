const request = require('superagent');

module.exports = (req, res, next) => {
  const name = req.body.location.name;
  if(!req.body.location.lat || !req.body.location.lon) {
    return request
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=02fd61fe81d6deddb87cd6c131a9148d&units=imperial`)
      .then(weather => {
        req.body.location.lat = weather.body.coord.lat;
        req.body.location.lon = weather.body.coord.lon;
        req.body.weather = {};
        req.body.weather.temp_max = weather.body.main.temp_max;
        req.body.weather.temp_min = weather.body.main.temp_min;
        req.body.weather.description = weather.body.weather[0].description;
        next();
      })
      .catch(next);
  } else {
    return request
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.location.lat}&lon=${req.body.location.lon}&APPID=02fd61fe81d6deddb87cd6c131a9148d&units=imperial`)
      .then(weather => {
        req.body.location.name = weather.body.name;
        req.body.weather = {};
        req.body.weather.temp_max = weather.body.main.temp_max;
        req.body.weather.temp_min = weather.body.main.temp_min;
        req.body.weather.description = weather.body.weather[0].description;
        next();
      })
      .catch(next);
  }
};


