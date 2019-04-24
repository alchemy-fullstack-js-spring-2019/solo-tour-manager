const Tour = require('../Model/Tour');
const TourStop = require('../Model/TourStop');
const { Router } = require('express');
const getWeather = require('../services/weather');


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
    

        const tour = req.params.id;
        
        const { location, weather, attendance } = req.body;
    

        TourStop
            .create({ tour, location, weather, attendance })
            .then(created=>{

                return res.send(created);
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
