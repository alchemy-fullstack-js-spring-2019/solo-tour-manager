const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: {
    type: [String]
  },
  launchdate: {
    type: Date
  },
  stops: [{
    location: {
      type: String //needs lat and long
    },
    weather: {
      type: String //pulling from wunderground api
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
