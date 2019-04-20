const Tour = require('../Model/Tour');
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
    .get('/', (req, res, next) =>{ 
        Tour 
            .find()
            .select({ __v:false })
            .lean()
            .then(found =>{ 
                return res.send(found);})
            .catch(next);
    })
;
 


