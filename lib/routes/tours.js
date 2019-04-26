const Tour = require('../Model/Tour');
const TourStop = require('../Model/TourStop');
const { Router } = require('express');
// const getWeather = require('../services/weather');
// jest.mock('../services/__mocks__/weather.js');



module.exports = Router()
    .post('/', (req, res, next) => {
     
      
        const { title, activities, date } = req.body;
      
        Tour
            .create({ title, activities, date })
            .then(created=>{
                res.send(created);})
            .catch(next);
    })
    // .post('/:id/stops', (req, res, next) => {
    //     const tourID = req.params.id;  
    //     const { tourStopId } = req.body;
       
//     return Tour.findByIdAndUpdate(tourID, { stops:tourStopId }, { new:true })
//         .populate('stops', { __v:false })
//         .select({ __v:false, _id:false })
//         .then(tourWithStop=>{
//             res.send(tourWithStop);       
//         })
//         .catch(next);
// })
    .post('/:id/stops', (req, res, next) => {
        const tourID = req.params.id;  
        const { location, weather, attendance } = req.body;

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
            })
        ;

            

       
      
        
  
    });
