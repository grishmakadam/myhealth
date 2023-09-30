const User = require("../models/User");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const { createToken } = require("../middlewares/createToken");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.register(name, email, password);
      await user.save();
      const token = await createToken(email);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({
        success: true,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ success: false, field: e.field, message: e.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = await createToken(email);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({
        success: true,
        email,
        name: user.name,
      });
    } catch (ex) {
      res.status(400).json({ success: false, message: ex.message });
    }
  },
};
