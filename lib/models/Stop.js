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
    sunRise: {
      type: Date
    },
    sunSet: {
      type: Date
    },
    weatherState: {
      type: String
    },
    temp: {
      type: Number
    },
    humidity: {
      type: Number
    }
  },
  attendance: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.model('Stop', stopSchema);
