const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  latLong: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  },
  weather: {
    state: {
      type: String
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    }
  },
  attendance: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.model('Stop', stopSchema);
