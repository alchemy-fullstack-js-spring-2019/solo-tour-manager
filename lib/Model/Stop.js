const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    location:{
        latitude:Number,
        longitude:Number
    },
    weather:{
        weather_state_abbr:String
    },
    attendance:{
        type:Number
    }
});

module.exports = mongoose.model('Stop', stopSchema);
