var db = require("../models");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
  app.post("/api/newUser", (req, res) => {
    console.log(req.body.userName);
    // db.User.create(req.body).then(dbUsers => {
    //   res.json(dbUsers);
    // });
    // bcrypt.genSalt(saltRounds, (err,salt) => {
    //   bcrypt.hash()
    // })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
      res.json(dbExample);
    });
  });
};
