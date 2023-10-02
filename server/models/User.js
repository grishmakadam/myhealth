const mongoose = require("mongoose");
const validator = require("validator");
const speakeasy = require("speakeasy");
const { encryptPassword } = require("../func/encryptPassword")
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otpSecret: {
    type: String,
  },
  cart: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
  ],
});

userSchema.statics.register = async function (name, email, password) {
  if (!validator.isEmail(email)) {
    throw { field: "email", message: "Invalid Email" };
  }
  if (!validator.isStrongPassword(password)) {
    throw { field: "password", message: "Not a strong password" };
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw { field: "email", message: "Email already in use" };
  }

  const hash = await encryptPassword(password)

  const otpSecret = speakeasy.generateSecret({ length: 20 }).base32;

  const user = await this.create({
    name,
    email,
    password: hash,
    otpSecret: otpSecret,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  console.log(email);
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return user
  } else {
    throw Error("Incorrect email or password");
  }
};
module.exports = mongoose.model("User", userSchema);
