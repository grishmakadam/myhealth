const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verifyUser", verifyToken, async (req, res) => {
    const { name, email }=req.user
    if (req.user) {
    return res.json({ success: true, message: "user authorized",email,name });
  }
});
router.get("/forgetPassword/:email", userController.forgetPassword);
router.post("/verifyOTP", userController.otpVerify);

module.exports = router;

