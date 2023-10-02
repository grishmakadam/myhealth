const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.verifyToken = async (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies) {
    console.log("NO COOKIES");
    return res.json({ success: false });
  }
  const token = req.cookies.token;

  if (!token) {
    console.log("FALSE COOKIES");

    return res.json({ success: false, error: "Session Expired" });
  }
  try {
    const { id } = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ email: id });
    req.user = user;
    console.log("CHECKED");
    next();
  } catch (e) {
    res.clearCookie("token");
    res
      .status(401)
      .json({ success: false, message: "Request is not authorized" });
  }
};
