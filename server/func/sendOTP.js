const nodemailer = require("nodemailer");

let mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

module.exports.sendOtp = async (email, token) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Link to change password",
    html: `Click <a href=${
      "http://localhost:3000/reset-password?token=" + token
    }Here</a>`,
  };
  const res = await mailer.sendMail(mailOptions);
  if (res.response) {
    return true;
  } else {
    return false;
  }
};
