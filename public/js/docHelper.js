$(document).ready(() => {
  let newpost = $("#newPost");
  let handleFormSubmit = event => {
      event.preventDefault();
      let songname = $("#songName").val().trim();
      let artistname = $("#artistName").val().trim();
      let genre = $("#genre").val();
      let body = $("#body").val().trim();
      let rating = parseInt($("#rating").val());
      let id = $("#userid").val().trim();
      let newPost = {
          songName: songname,
          artistName: artistname,
          genre: genre,
          body: body,
          rating: rating,
          userId: id
      }
      submitPost(newPost);
  }
  submitPost = post => {
      $.post("/api/posts", post, () => {
          window.location.href = "/index";
      })
  }
  $(newpost).on("submit", handleFormSubmit);
  
//   getAuthors = () => {
//     $.get("/api/users", data => {
//         for(let i = 0; i < data.length; i++)
//         {
//             console.log(data[i].Posts.length);
//         }
//     })
//   };
//   getAuthors();
})