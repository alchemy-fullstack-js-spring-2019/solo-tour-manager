function getWeather() {
  return Promise.resolve({
    consolidated_weather: [
      {
        weather_state_name: 'Light Cloud',
        the_temp: 14.195,
        humidity: 72,
        
      }
    ],
    sun_rise: '2019-04-21T06:26:32.195043-07:00',
    sun_set: '2019-04-21T19:49:55.671339-07:00',
    title: 'San Francisco',
    woeid: 2487956
  });
}

module.exports = {
  getWeather
};
