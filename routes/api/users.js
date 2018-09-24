const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const register_validation = require("../../validation/register");
const login_validation = require("../../validation/login");

const passport = require("passport");

//Load User Model
const User = require("../../models/User");

//@route GET api/users/test
//@desc for testing the route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users route works" }));

//@route POST api/users/register
//@desc to register the user
//@access Public
/*<---------------------------------REGISTER-------------------------------------------------->*/
router.post("/register", (req, res) => {
  const { error, isValid } = register_validation(req.body);

  if (isValid === false) {
    console.log(error);
    res.status(400).json(error);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: 100, //size
          r: "pg", //rating
          d: "mm" //default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//@route POST api/users/login
//@desc for login user/returning JWT token
//@accesss Public
/*<---------------------------------------------------LOGIN---------------------------------------------->*/
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error, isValid } = login_validation(req.body);

  if (isValid === false) {
    console.log(error);
    res.status(400).json(error);
  } else {
    User.findOne({ email }).then(user => {
      if (user === null) {
        console.log("email does not exits");
        res.status(404).json({ email: "this email does not exists" });
      } else {
        console.log(user);

        bcrypt
          .compare(password, user.password)

          .then(isMatched => {
            if (isMatched) {
              console.log("password matched");
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              console.log("password does not matched");
              res.status(400).json({ password: "invalid password" });
            }
          });
      }
    });
  }
});

//@route GET api/users/current
//@desc return the current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
