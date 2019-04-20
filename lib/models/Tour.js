const mongoose = require('mongoose');
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
  stops: []
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
