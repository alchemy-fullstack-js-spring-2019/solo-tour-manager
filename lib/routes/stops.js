const Stop = require('../Model/Stop');
const { Router } = require('express');
const getWeather = require('../service/service');

module.exports = Router()
    .post('/', (req, res, next) => {
        return getWeather
            .then(weather=>{
                Stop
                    .create({})
            });
    });
