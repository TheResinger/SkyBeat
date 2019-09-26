$(document).ready(() => {
  let API = {
    saveUser: user => {
      return $.ajax({
        type: "POST",
        url: "api/newUser",
        data: JSON.stringify(user)
      });
    }
  };
  $("#submit").on("click", e => {
    e.preventDefault();
    var user = {
      userName: $("#username")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };
    console.log(user);
    API.saveUser(user).then(() => {
      console.log("USER SAVED");
    });
  });
});
// const plaintextPass = $("#password")
//   .val()
//   .trim();
