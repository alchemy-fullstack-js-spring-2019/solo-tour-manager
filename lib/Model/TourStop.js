const mongoose = require('mongoose');



const stopSchema = new mongoose.Schema({

    
    location:{
        cordinates:String,
    },
    weather:{
        type:String
    },
    attendance:{
        type:Number
    }
});

module.exports = mongoose.model('Stops', stopSchema);

