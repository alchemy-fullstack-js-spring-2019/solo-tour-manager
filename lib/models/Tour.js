const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: [{
    type: String
  }],
  launchDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Tour', tourSchema);
