const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    default: 10,
  },
  booked: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Slot", slotSchema);
