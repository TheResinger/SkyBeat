const { ensureAuthenticated } = require("../config/auth");
let db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

module.exports = function (app) {
  //html
  app.get("/", (req, res) => {
    res.render("login");
  });
  app.get("/index", ensureAuthenticated, (req, res) => {
    db.Post.findAll({
      where: {
        userId: req.user.id
      }
    }).then(postcount => {
      db.Post.findAll().then(data => {
        console.log(req.user.userName);
        console.log(JSON.stringify(data));
        let genrecount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < data.length; i++) {
          switch (data[i].genre) {
            case "Alternative":
              genrecount[0] += 1;
              break;
            case "Blues":
              genrecount[1] += 1;
              break;
            case "Classical":
              genrecount[2] += 1;
              break;
            case "Country":
              genrecount[3] += 1;
              break;
            case "Dance":
              genrecount[4] += 1;
              break;
            case "Electronic":
              genrecount[5] += 1;
              break;
            case "Hip-Hop/Rap":
              genrecount[6] += 1;
              break;
            case "Jazz":
              genrecount[7] += 1;
              break;
            case "Latin":
              genrecount[8] += 1;
              break;
            case "Pop":
              genrecount[9] += 1;
              break;
            case "R&B/Soul":
              genrecount[10] += 1;
              break;
            case "Rock":
              genrecount[11] += 1;
              break;
            case "Metal":
              genrecount[12] += 1;
              break;
          }
        }
        res.render("index", {
          user: req.user.userName,
          id: req.user.id,
          postCount: postcount.length,
          g1: genrecount[0],
          g2: genrecount[1],
          g3: genrecount[2],
          g4: genrecount[3],
          g5: genrecount[4],
          g6: genrecount[5],
          g7: genrecount[6],
          g8: genrecount[7],
          g9: genrecount[8],
          g10: genrecount[9],
          g11: genrecount[10],
          g13: genrecount[11],
          g13: genrecount[12],
          posts: data
        });
      });
    })
  });
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/register", (req, res) => {
    res.render("register");
  });
  app.get("/newpost", ensureAuthenticated, (req, res) => {
    res.render("newpost", {
      user: req.user.userName,
      id: req.user.id
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("successMsg", "You are logged out.");
    res.redirect("/login");
  });

  app.get("*", (req, res) => {
    res.render("404");
  });

  //api
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
          throw err;
        }
        db.user.create({
          userName: username,
          email: email,
          password: hash
        }).then(() => {
          req.flash("successMsg", "You are now registered and can login.");
          res.redirect("/login");
        }).catch(err => console.log(err));
      });
    }
  });

  app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/index",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  });

  app.post("/api/posts", (req, res) => {
    console.log(req.body);
    db.Post.create(req.body).then(dbPost => res.json(dbPost));
  });

  app.get("/api/users/", (req, res) => {
    db.user.findAll({
      include: [db.Post]
    }).then(dbUser => {
      res.json(dbUser);
    });
  });
  app.get("/api/users/:id", (req, res) => {
    db.user.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Post]
    }).then(dbUser => {
      res.json(dbUser);
    });
  });
  app.get("/api/posts/:genre", (req, res) => {

  })
};
