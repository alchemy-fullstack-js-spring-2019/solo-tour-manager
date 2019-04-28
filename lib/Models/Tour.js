const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: [String],
  launchDate: {
    type: Date,
    default: new Date()
  },
  stops: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Stop'
  }]
});

module.exports = mongoose.model('Tour', tourSchema);
