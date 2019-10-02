require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const db = require("./models");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// Passport Config
require("./config/passport")(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Express session
app.use(session({ secret: "fdjakfdjsa", resave: true, saveUninitialized: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.error = req.flash("error");
  next();
});

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

Handlebars.registerHelper("goldstars", (n, block) => {
  var accum = "";
    for(let i = 0; i < n; i++){
        accum += block.fn(i);
    }

  return accum;
});

// Routes
require("./routes/routes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
