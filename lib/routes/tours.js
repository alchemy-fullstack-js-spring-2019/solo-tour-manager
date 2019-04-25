const Tour = require('../Model/Tour');
const TourStop = require('../Model/TourStop');
const { Router } = require('express');



module.exports = Router()
    .post('/', (req, res, next) => {
     
      
        const { title, activities, date } = req.body;
      
        Tour
            .create({ title, activities, date })
            .then(created=>{
                res.send(created);})
            .catch(next);
    })
    .post('/:id/stops', (req, res, next) => {
        const tourID = req.params.id;  
        const { tourStopId } = req.body;
        console.log('tourStopId in', tourStopId);
        Tour.findById(tourID)
            .then(foundTour=>{
                const test = tourStopId ;
                console.log('test', test);
                const foundTourJson = foundTour.toJSON();
                const foundTourStops = foundTourJson.stops;
                //const updatedTourStops = [...foundTourStops, { tourStopId }]; 
                const updatedTourStops = [...foundTourStops, { stops:tourStopId }];  
                console.log('updatedTourStops', updatedTourStops);        
                return Tour.findByIdAndUpdate(tourID, { stops:tourStopId }, { new:true })
                    .populate('stops')
                    .then(tourWithStop=>{
                        res.send(tourWithStop);       
                    });
            })
            .catch(next);
    })
  
    .get('/', (req, res, next) =>{ 
        Tour 
            .find()
            .populate('stop')
            .select({ __v:false })
            .lean()
            .then(found =>{ 
                return res.send(found);})
            .catch(next);
    })
    .get('/stops', (req, res, next) =>{ 
        console.log('gettting all stops');
        TourStop
            .find()
            .populate('tour')
            .select({ __v:false })
            .lean()
            .then(found =>{ 
                console.log('found stops', found);
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
    });
