const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: [String],
  launchDate: Date,
  stops: [{
    location: String,
    weather: {
      temp: Number,
      weatherState: String
    },
    attendance: Number
  }]
});

module.exports = mongoose.model('Tour', tourSchema);
