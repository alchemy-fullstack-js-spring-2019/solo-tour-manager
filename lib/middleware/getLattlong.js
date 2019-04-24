const request = require('superagent');

function getLattLong(req, res, next) {
  console.log(req);
  return request
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${req}`)
    .then(res => {
      console.log('WILL I FIND MY LOCATION HERE', res.body[0].title);
      req.body.location.latt_long = res.body[0].title;
      return res.body[0].woeid;
    })
    .then(geoNum => {
      return request
        .get(`https://www.metaweather.com/api/location/${geoNum}`);
    })
    .then(weatherStatus => {
      console.log('WE SHOULD HAVE SOMETHING', weatherStatus.body.consolidated_weather[0].weather_state_name);
      // req.body.weather.weather_state_name = weatherStatus.body.consolidated_weather[0].weather_state_name;
      // req.body.weather.weather_state_name = weatherStatus.body.consolidated_weather[0].weather_state_name;

      
    })
    .catch(next);
} 





getLattLong('43.041809,-87.906837');

module.exports = getLattLong;
