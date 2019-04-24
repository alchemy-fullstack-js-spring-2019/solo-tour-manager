const mongoose = require('mongoose');

console.log('creating a stop in Tour Stop');

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
        weather:String
    },
    attendance:{
        type:Number
    }
});

module.exports = mongoose.model('TourStop', stopSchema);

