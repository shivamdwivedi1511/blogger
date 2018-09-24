const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`connected to mongoose`))
  .catch(error => console.log(error));

//passport middleware
app.use(passport.initialize());

//passport configuration
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`listening to  port ${port}`));
