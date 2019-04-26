const weatherService = require('../services/weather');

const getWeather = async(req, res, next)=>{
    const weather = await weatherService();
    req.weather = weather;
    console.log('weather in middleware', weather);
    next();
};

module.exports = getWeather;
