const mongoose = require('mongoose');

console.log('making a stop')

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
        weather_state_abbr:String
    },
    attendance:{
        type:Number
    }
});

module.exports = mongoose.model('tourStop', stopSchema);

