const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({

    tour:{
        ref:'Tour',
        type:mongoose.Types.ObjectId,
        required: true
    },
    location:{
        latitude:String,
        longitude:String
    },
    weather:{
        weather_state_abbr:String
    },
    attendance:{
        type:Number
    }
});

module.exports = mongoose.model('Stop', stopSchema);
