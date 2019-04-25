const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    name: String,
    woeid: Number
  },
  weather: {
    weather_state_name: {
      type: 'String'
    },
    temp: {
      type: Number
    }
  },
  attendance: {
    type: Number,
    min: 1
  }
});

const Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;
