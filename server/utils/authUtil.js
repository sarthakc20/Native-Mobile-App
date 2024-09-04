const bcrypt = require("bcrypt");

// Hash Function
exports.hashPassword = (passowrd) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(passowrd, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

// Compare or decrypt password
exports.comparePassword = (passowrd, hashed) => {
  return bcrypt.compare(passowrd, hashed);
};
