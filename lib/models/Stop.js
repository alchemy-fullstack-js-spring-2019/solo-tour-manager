const mongoose = require('mongoose');
const stopSchema = new mongoose.Schema({
  location: {
    city: String,
    state: String,
    zip: String,
    required: true
  },
  weather: {
    applicable_date: Date,
    weather_state_name: String,
  },
  attendance: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.model('Stop', stopSchema);

