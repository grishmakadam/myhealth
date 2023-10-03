const express = require("express");
const router = express.Router();

const {
  addToCart,
  deleteItemFromCart,
  removeItemFromCart,
  getAllCartItems,
  buyNow,
  purchaseHistory,
} = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/verifyToken");
router.post("/addToCart", verifyToken, addToCart);
router.delete("/deleteFromCart", verifyToken, deleteItemFromCart);
router.patch("/removeItem", verifyToken, removeItemFromCart);
router.get("/allItems", verifyToken, getAllCartItems);
router.patch("/buyNow", verifyToken, buyNow);
router.get("/purchaseHistory",verifyToken,purchaseHistory)
module.exports = router;
