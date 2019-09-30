module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/dashboard", (req, res) => {
    res.render("dashboard");
  })
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/register", (req, res) => {
    res.render("register");
  });
  app.get("*", (req, res) => {
    res.render("404");
  });
};
