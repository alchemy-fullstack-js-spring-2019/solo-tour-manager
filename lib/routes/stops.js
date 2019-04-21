// const Stop = require('../Model/Stop');
// const { Router } = require('express');
// const getWeather = require('../service/service');

// module.exports = Router()
//     .post('/', (req, res, next) => {  
//         return getWeather()
//             .then(weather=>{
//                 const { tour, attendance } = req.body; 
//                 const { latt_long, currentWeather } = weather;
//                 Stop
//                     .create({
//                         tour: tour,
//                         location: { cordinates: latt_long },
//                         weather: { weather_state_abbr: currentWeather },
//                         attendance: attendance
//                     })
            
//                     .then(created => res.send(created))
//                     .catch(next);
//             });
//     })
//     .get('/', (req, res, next) => {
        
//         Stop
//             .find()
//             .lean()
//             .then(foundStops => res.send(foundStops))
//             .catch(next);
//     })
//     .patch('/:id', (req, res, next) => {
//         const id = req.params.id;
//         const attendance = req.body.attendance;    
//         Stop 
//             .findByIdAndUpdate(id, { attendance:attendance }, { new:true })
//             .select({ __v:false }) 
//             .lean()
//             .then(updated => res.send(updated))
//             .catch(next);

//     })
//     .delete('/:id', (req, res, next) => {  
//         const id = req.params.id;
//         Stop
//             .findByIdAndDelete(id)
//             .lean()
//             .then(deleted => res.send(deleted))
//             .catch(next);
//     });
