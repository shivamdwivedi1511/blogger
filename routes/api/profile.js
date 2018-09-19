const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

//@route GET api/profile/test
//@desc for testing the route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "profile route works" }));

module.exports = router;
