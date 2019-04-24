const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true
    }    
  },
  weather: {
    temp_max: Number,
    temp_min: Number,
    description: String
  },
  attendance: {
    type: Number, 
    required: true,
    min: 1
  }
});

module.exports = mongoose.model('Stop', stopSchema);

