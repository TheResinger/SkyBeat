const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load User
const db = require("../models");

module.exports = (passport, user) => {
  let User = user;
  passport.use(
    new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    }, (req, username, password, done) => {
      // Match User
      db.user.findOne({
        where: {
          userName: username
        }
      })
        .then(user => {
          // Match User
          if (!user) {
            return done(null, false, { message: "That username does not exist." });
          }

          // Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Password is incorrect." });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.user.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
};
