const Tour = require('../Model/Tour');
const weatherService = require('../services/weather');
const getWeather = require('../middleware/weather');
const TourStop = require('../Model/TourStop');
const { Router } = require('express');
// const getWeather = require('../services/weather');
// jest.mock('../services/__mocks__/weather.js');



module.exports = Router()
    .post('/:tourId/stops/:stopId/attendence', (req, res, next) => {

        const tourToUpdateStopFromId = req.params.tourId;
        const idOfStopUpdate = req.params.stopId;
        const updatedAttendance = req.body.attendance;
   
        return TourStop
            .findByIdAndUpdate(idOfStopUpdate, { attendance: updatedAttendance }, { new:true })
            .then(()=>{
                return Tour
                    .findById(tourToUpdateStopFromId)
                    .populate('stops')
                    .then(updatedTour=>{
                        res.send(updatedTour);
                    })  
                    .catch(next);
            });      
    })
    .post('/', (req, res, next) => {
        const { title, activities, date } = req.body; 
        Tour
            .create({ title, activities, date })
            .then(created=>{
                res.send(created);})
            .catch(next);
    })
    .post('/:id/stops', getWeather, (req, res, next) => {
        console.log('req weather', req.weather);
        const tourID = req.params.id;  
        const weather = req.weather.currentWeather;
        const { location, attendance } = req.body;
        return TourStop
            .create({ location, weather, attendance })
            .then(createdTourStop => {
                const tourStopId = createdTourStop._id;
                Tour
                    .findByIdAndUpdate(tourID, { stops:tourStopId }, { new:true })

                    .populate('stops', { __v:false })
                    .then(updatedTour=>res.send(updatedTour))
                    .catch(next);
            });      
    })
    .get('/', (req, res, next) =>{ 
        Tour 
            .find()
            .populate('stops')
            .select()
            .lean()
            .then(found =>{ 
                return res.send(found);})
            .catch(next);
    })
    .get('/stops', (req, res, next) =>{ 
        TourStop
            .find()
            .select({ __v:false })
            .lean()
            .then(found =>{ 
                return res.send(found);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) =>{
        const id = req.params.id;
        Tour
            .findById(id)
            .select({ __v:false, _id:false })
            .lean()
            .then(found=>res.send(found))
            .catch(next);
    })
    .delete('/:tourId/stops/:stopId', (req, res, next) =>{
        const tourToRemoveStopFromId = req.params.tourId;
        const idOfStopToDelete = req.params.stopId;
        let updatedTourStops;
      
        return Tour
            .findById(tourToRemoveStopFromId)
            .then(foundTour=>{
                const foundTourStops = foundTour.stops;
                updatedTourStops = foundTourStops.filter(item=>item != idOfStopToDelete);         
            })
            .then(()=>{
                return Tour
                    .findByIdAndUpdate(tourToRemoveStopFromId, { stops:updatedTourStops }, { new:true });
            })
            .then(()=>{
                return TourStop
                    .findByIdAndDelete(idOfStopToDelete)
                    .lean()
                    .select({ __v:false })
                    .then(deletedStop=>res.send(deletedStop));
            });
    });
