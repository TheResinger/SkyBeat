const bcrypt = require("bcrypt");
const saltRounds = 10;
const plaintextPass = $("#password");

const handleFormSubmit = event => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(plaintextPass, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser = hash => {
        return $.ajax({
          type: "POST",
          url: "api/newUser",
          data: JSON.stringify(hash)
        });
      };
      newUser(hash);
    });
  });
}
