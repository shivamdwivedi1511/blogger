const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function register_validation(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    error.name = "Name must be between 2 and 30 character long";
  }

  if (Validator.isEmpty(data.name)) {
    error.name = "Name field is required";
  }

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
  if (!Validator.equals(data.password, data.password2)) {
    error.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.password2)) {
    error.password2 = "Confirm password field is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
