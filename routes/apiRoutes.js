var db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

module.exports = function (app) {
  app.post("/register", (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    let errors = [];

    // Check required fields
    if (!username || !email || !password) {
      errors.push({ msg: "Please fill in all fields" });
    }

    // Check Pass length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters long" });
    }

    if (errors.length > 0) {
      console.log(errors);
      res.render("register", {
        errors: errors,
      });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          throw err
        }
        db.user.create({
          userName: username,
          email: email,
          password: hash
        }).then(user => {
          req.flash("success_msg", "You are now registered and can login.");
          res.redirect("/login");
        }).catch(err => console.log(err));
      });
    }
  });

  app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out.");
    res.redirect("/login");
  });
};
