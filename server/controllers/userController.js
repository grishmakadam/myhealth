const User = require("../models/User");
const speakeasy = require("speakeasy");
const { createToken } = require("../middlewares/createToken");
const { sendOtp } = require("../func/sendOTP");
const { encryptPassword } = require("../func/encryptPassword");
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
        // secure: true,
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
  forgetPassword: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.find({ email });
      console.log(user);
      if (user.length == 0) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email" });
      }
      // const otp = speakeasy.totp({
      //   secret: user.otpSecret,
      //   encoding: "base32",
      //   step: 60,
      //   window: 5,
      // });
      const token = await createToken(email);

      const temp = await sendOtp(user[0].email, token);
      if (temp) {
        return res.json({
          success: true,
          message: "Password reset link has been sent to registered email",
        });
      } else {
        throw Error("Something went wrong!!");
      }
    } catch (ex) {
      console.log("hii", ex.message);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!!" });
    }
  },
  otpVerify: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await User.find({ email: email });

      const verified = speakeasy.totp.verify({
        secret: user.otpSecret,
        encoding: "base32",
        token: otp,
        step: 60,
        window: 5,
      });
      if (verified) {
        // res.cookie("token", token, {
        //   expires: new Date(Date.now() + 900000000),
        //   httpOnly: true,
        //   // secure: true,
        // });
        res.json({ success: true, message: "Otp verified" });
      } else {
        console.log(verified);
        res.json({ success: false, message: "Otp verification failed" });
      }
    } catch (ex) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!!" });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const hash = await encryptPassword(newPassword);
      req.user.password = hash;
      await req.user.save();

      return res.json({
        success: false,
        message: "Password changed successfully!",
      });
    } catch (ex) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!!" });
    }
  },
};
