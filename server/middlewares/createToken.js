const jwt=require("jsonwebtoken")

module.exports.createToken = (id,expiresIn="1h") => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: expiresIn,
  });
};
