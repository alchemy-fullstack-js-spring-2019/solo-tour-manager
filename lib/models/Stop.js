const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    type: String, 
    required: true 
  },
  weather: {
    applicable_date: {
      type: Date
    },
    weather_state_name: {
      type: 'String'
    }
  },
  attendance: {
    type: Number,
    min: 1
  }
});

const Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;
