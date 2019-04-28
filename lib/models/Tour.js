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
    type: Date,
    required: true,
    default: new Date()
  },
  stops: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Stop'
  }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
