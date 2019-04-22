const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    latt_long: { type: String, required: true }
  }
});
