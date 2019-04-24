const mongoose = require('mongoose');



const stopSchema = new mongoose.Schema({

    tour:{
        ref:'Tour',
        type:mongoose.Types.ObjectId,
        required: true
    },
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

module.exports = mongoose.model('TourStop', stopSchema);

