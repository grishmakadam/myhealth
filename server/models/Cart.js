const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  planId: {
    type: Number,
    required: true,
    // unique: true,
  },
  planName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  bought: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Cart", cartSchema);
