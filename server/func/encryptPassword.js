const bcrypt = require("bcrypt");

module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash
}