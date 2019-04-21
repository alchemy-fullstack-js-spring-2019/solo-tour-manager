const Stop = require('../Model/Stop');
const { Router } = require('express');
const getWeather = require('../service/service');

module.exports = Router()
    .post('/', (req, res, next) => {  
        return getWeather()
            .then(weather=>{
                const { tour, attendance } = req.body; 
                const { title, latt_long, currentWeather } = weather;
                console.log('tourid', tour, 'att', attendance, 'lattlong', latt_long);
                Stop
                    .create({
                        tour: tour,
                        location: { cordinates: latt_long },
                        weather: { weather_state_abbr: currentWeather },
                        attendance: attendance
                    })
            
                    .then(created => res.send(created))
                    .catch(next);
            });
    })
    .get('/', (req, res, next) => {
        console.log('getting stops');
        Stop
            .find()
            .lean()
            .then(foundStops => res.send(foundStops))
            .catch(next);
    })

;
