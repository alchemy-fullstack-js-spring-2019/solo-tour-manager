const weatherInfo = 
  { 
      city: 'Mexico City',
      latt_long: '19.431900,-99.132851',
      currentWeather: 'Heavy Cloud' 
  };

function getWeather() {
    return Promise.resolve(weatherInfo);
}

module.exports = getWeather;
