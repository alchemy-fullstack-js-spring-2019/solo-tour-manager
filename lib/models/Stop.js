const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour'
  },
  latLong: {
    lat: {
      type: Number
    },
    long: {
      type: Number
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
