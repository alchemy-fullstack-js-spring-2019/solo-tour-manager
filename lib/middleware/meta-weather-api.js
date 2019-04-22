const { makeLLUrl, makeWoeidUrl } = require('../middleware/make-search-url');
const fetch = require('fetch');


function fetchWeather(location) {
  const url = makeLLUrl(location);

  fetch(url)
    .then(res => res.json())
    .then(result => { 
      return result[0].woeid;
    })
    .then(newWoeid => {
      makeWoeidUrl(newWoeid);
    })
    .then(res => {
      fetch(res);
    })
    .then(res => {
      return res;
    });
}

module.exports = fetchWeather;
