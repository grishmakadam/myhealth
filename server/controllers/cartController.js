const Cart = require("../models/Cart");
const Order = require("../models/Order");
module.exports = {
  addToCart: async (req, res) => {
    try {
      const user = req.user;
      const existingItem = (await user.populate("cart")).cart.filter(
        (x) => x.planId == req.body.planId && x.bought != true
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
        (x) => x.planId == req.body.planId && x.bought != true
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
        (x) => x.planId == req.body.planId && x.bought != true
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
    let cart = await user.populate("cart");
    console.log(cart.cart);
    cart = cart.cart.filter((x) => x.bought != true);
    return res.json({
      success: true,
      items: cart,
    });
  },
  buyNow: async (req, res) => {
    try {
      const { total, tax } = req.body;
      const user = req.user;
      const cart = await user.populate("cart");

      const order = await Order({
        total: total,
        tax: tax,
      });
      for (let item of cart.cart) {
          if (!item.bought) {
              item.bought = true;
              await item.save();
              await order.plans.push(item);
          }
      }
      const newOrder = await order.save();
      await user.orders.push(newOrder);
      await user.save();
      return res.json({
        success: true,
        items: cart.cart,
      });
    } catch (ex) {
      console.log(ex.message);
      return res.status(500).json({ success: false, message: ex.message });
    }
  },
  purchaseHistory: async (req, res) => {
    try {
      const user = req.user;
      let orders = await user.populate({
        path: "orders",
        populate: {
          path: "plans",
          model: "Cart",
        },
      });

      return res.json({
        success: true,
        items: orders.orders,
      });
    } catch (ex) {
      return res.status(500).json({ success: false, message: ex.message });
    }
  },
};
