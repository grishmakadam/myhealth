const express = require("express");
const router = express.Router();

const {
  addToCart,
  deleteItemFromCart,
  removeItemFromCart,
  getAllCartItems,
} = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/verifyToken");
router.post("/addToCart", verifyToken, addToCart);
router.delete("/deleteFromCart", verifyToken, deleteItemFromCart);
router.patch("/removeItem", verifyToken, removeItemFromCart);
router.get("/allItems", verifyToken, getAllCartItems);

module.exports = router;
