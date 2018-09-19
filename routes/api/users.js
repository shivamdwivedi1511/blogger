const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load User Model
const User = require("../../models/User");

//@route GET api/users/test
//@desc for testing the route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users route works" }));

//@route POST api/users/register
//@desc to register the user
//@access Public

router.post("/register", (req, res) => {
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
});

//@route POST api/users/login
//@desc for login user/returning JWT token
//@accesss Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (user === null) {
      console.log("email does not exits");
      res.status(404).json({ email: "this email does not exists" });
    } else {
      console.log(user);

      bcrypt.compare(password, user.password).then(isMatched => {
        if (isMatched) {
          console.log("password matched");
          const payload = {
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
});

module.exports = router;
