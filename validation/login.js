const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function login_validation(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    error.email = "Email field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "password is Invalid";
  }
  if (Validator.isEmpty(data.password)) {
    error.password = "password field is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
