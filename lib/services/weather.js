const request = require('superagent');

function getWeatherId(req, res, next) {
  const lat = req.body.latLong.lat;
  const long = req.body.latLong.long;

  return request
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => res.body[0].woeid)
    .then(id => {
      return request
        .get(`https://www.metaweather.com/api/location/${id}/`);
    })
    .then(res => req.weather = res.body.precipitation???);
}
