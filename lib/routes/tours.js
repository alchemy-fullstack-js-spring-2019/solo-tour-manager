const Tour = require('../Model/Tour');
const { Router } = require('express');


module.exports = Router()
    .post('/', (req, res, next) => {
      
        const { title, activities, date } = req.body;
      
        Tour
            .create({ title, activities, date })
     
            .then(created=>{
                console.log('created', created);
                res.send(created);})
            .catch(next);
    });
 


