const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    latt_long: { type: String, required: true }
  },
  weather: {
    applicable_date: {
      type: Date
    },
    weather_state_name: {
      type: 'String'
    }
  }
});

const Stop = mongoose.model('Stop', stopSchema);
