const crypto = require("crypto");

function hashPassword(pwd) {
  return crypto.createHash("md5").update(pwd).digest("hex"); // MD5 em senha
}
module.exports = { hashPassword };
