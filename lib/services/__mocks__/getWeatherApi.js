function getWeather(lat, lon) {
  if(!lat && !lon) {
    return Promise.resolve({
      weather: [
        {
          description: 'clear sky',
          icon: '01n'
        }
      ],
      main: {
        temp: 285.514,
        pressure: 1013.75,
        humidity: 100,
        temp_min: 285.514,
        temp_max: 285.514,
        sea_level: 1023.22,
        grnd_level: 1013.75
      }    
    });
  }
  else {
    return Promise.resolve({
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n'
        }
      ],
      base: 'stations',
      main: {
        temp: 46.44,
        pressure: 1021.14,
        humidity: 98,
        temp_min: 46.44,
        temp_max: 46.44,
        sea_level: 1021.14,
        grnd_level: 881.85
      }
    });
  }
}

module.exports = getWeather();
