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
      type: mongoose.Types.ObjectId, //needs lat and long
      ref: 'Stop'
    },
    weather: {
      type: mongoose.Types.ObjectId, //pulling from wunderground api
      ref: 'Stop'
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
