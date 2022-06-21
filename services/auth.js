const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

const hashPassword = function (password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password.trim(), salt);
  return hash;
};

module.exports = {
  hashPassword,
};
