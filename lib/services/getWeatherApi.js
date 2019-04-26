const request = require('superagent');

module.exports = (req, res, next) => {
  const {
    location,
  } = req.body;
  if(!location.lat || !location.lon) {
    const name = location.name;
    return request
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=02fd61fe81d6deddb87cd6c131a9148d&units=imperial`)
      .then(weather => {
        req.body.weather = {
          temp_max: weather.main.temp_max,
          temp_min: weather.main.temp_min,
          description: weather.weather[0].description
        }
          .catch(next);
      });
  } else {
    return request
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&APPID=02fd61fe81d6deddb87cd6c131a9148d&units=imperial`)
      .then(weather => {
        req.body.weather = {
          temp_max: weather.main.temp_max,
          temp_min: weather.main.temp_min,
          description: weather.weather[0].description
        };
      })
      .catch(next);
  }
};


