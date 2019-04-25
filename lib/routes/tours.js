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
       
        return Tour.findByIdAndUpdate(tourID, { stops:tourStopId }, { new:true })
            .populate('stops')
            .then(tourWithStop=>{
                res.send(tourWithStop);       
            })
            .catch(next);
    })
  
    .get('/', (req, res, next) =>{ 
        Tour 
            .find()
            .populate('stops')
            .select({ __v:false })
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
    });
