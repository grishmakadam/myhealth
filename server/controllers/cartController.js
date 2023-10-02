const Cart = require("../models/Cart");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const user = req.user;
      const existingItem = (await user.populate("cart")).cart.filter(
        (x) => x.planId == req.body.planId
      );

      if (existingItem.length != 0) {
        const item = await Cart.findById(existingItem[0]._id);
        item.quantity += 1;
        await item.save();
        const cart = await user.populate("cart");
        return res.json({
          success: true,
          items: cart.cart,
        });
      }
      const newItem = new Cart({
        ...req.body,
        quantity: 1,
      });

      await newItem.save();
      user.cart.push(newItem._id);
      await user.save();
      const cart = await user.populate("cart");
      return res.json({
        success: true,
        items: cart.cart,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
  removeItemFromCart: async (req, res) => {
    try {
      console.log("hii");
      const user = req.user;
      const existingItem = (await user.populate("cart")).cart.filter(
        (x) => x.planId == req.body.planId
      );

      if (existingItem.length != 0) {
        const item = await Cart.findById(existingItem[0]._id);

        if (item.quantity < 2) {
          await Cart.findByIdAndRemove(item._id);
          return res.json({ success: true, items: cart.cart });
        }
        item.quantity -= 1;
        await item.save();
        const cart = await user.populate("cart");
        return res.json({ success: true, items: cart.cart });
      }

      return res.json({
        success: false,
        message: "No such item in cart!!",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
  deleteItemFromCart: async (req, res) => {
    try {
      const user = req.user;
      const existingItem = (await user.populate("cart")).cart.filter(
        (x) => x.planId == req.body.planId
      );

      if (existingItem.length != 0) {
        const item = await Cart.findByIdAndRemove(existingItem[0]._id);
        const cart = await user.populate("cart");
        return res.json({ success: true, items: cart.cart });
      }
      return res.json({ success: false, message: "No such item in cart!!" });
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
  getAllCartItems: async (req, res) => {
    const user = req.user;
    const cart = await user.populate("cart");
    return res.json({
      success: true,
      items: cart.cart,
    });
  },
};
