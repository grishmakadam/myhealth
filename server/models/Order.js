const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  plans: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
