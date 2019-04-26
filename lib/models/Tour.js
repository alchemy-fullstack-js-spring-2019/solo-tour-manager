const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    city: String,
    state: String,
    zip: String,
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

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: [String],
  launchDate: {
    type: Date,
    default: Date.now()
  },
  stops: [stopSchema]
});

module.exports = mongoose.model('Tour', tourSchema);

