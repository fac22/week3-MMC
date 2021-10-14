"use strict";

const model = require("../database/model.js");
const db = require("../database/connection");
const html = require("../routes/html.js");

async function get(request, response) {
  if (!request.signedCookies.sid) {
    response.redirect("/");
  } else {
    const { id } = await model.getSession(request.signedCookies.sid);
    const reviews = await model.getReviews(id);

    const reviewHTML = reviews

      .map((review) => {
        return `<li> ${review.film} - ${review.rating} - <button name='delete' value='${review.id}'>Delete</button></li>`;
      })
      .join("");

    const HTML = `
    <form method="POST" action='/delete'>
 <ul>${reviewHTML} </ul>
  </form>
    <form action="profile" method="POST">
    
    <h2>Add a new film</h2>
        <label for="film">Film Title</label>
        <input type="text" id="film" name="film" placeholder="Please enter the title of the film" required>

        <label for="rating">Rating</label>
        <select name="rating" id="rating">
          <option value="">--Please choose a rating--</option>
          <option value="1">🥔</option>
          <option value="2">🥔🥔</option>
          <option value="3">🥔🥔🥔</option>
          <option value="4">🥔🥔🥔🥔</option>
          <option value="5">🥔🥔🥔🥔🥔</option>
        </select>
    <button>Add Review 🍟</button>
    </form>
    <form action="/log-out" method="POST">
        <button>Log out</button>
    </form>
`;
    return response.send(html.htmlBuilder("Profile Page", HTML));
  }
}

async function post(request, response) {
  const { id } = await model.getSession(request.signedCookies.sid);
  console.log(id, "User Data 🔗");
  const { film, rating } = await request.body;
  return model
    .createReview(id, film, rating)
    .then(() => response.redirect("/profile"));
}

async function deleteReview(request, response) {
  console.log("DELETE FUNCTION IN PROFILE.JS");
  const body = await request.body;
  return model
    .deleteReview(body.delete)
    .then(() => response.redirect("/profile"));
}

module.exports = { get, post, deleteReview };
