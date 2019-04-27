const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activities: {
    required: true, 
    type: [String],
  },
  launchDate: {
    type: Date,
    default: Date.now()
  },
  stops: [{ type: mongoose.Schema.ObjectId, ref: 'Stop' }]
});

module.exports = mongoose.model('Tour', tourSchema);
