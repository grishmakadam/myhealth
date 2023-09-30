const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
