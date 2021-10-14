"use strict";

const model = require("../database/model.js");
const db = require("../database/connection");
const html = require("../routes/html.js");

async function get(request, response) {
  const { id } = await model.getSession(request.signedCookies.sid);
  console.log(await model.getReviews(id));

  const reviews = await model.getReviews(id);
  const reviewHTML = reviews
    .map((review) => `<li> ${review.film} - ${review.rating}</li>`)
    .join("");
  // console.log(model.getReviews(id));
  const HTML = `
 <ul>${reviewHTML} </ul>
  
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
`;

  return response.send(html.htmlBuilder("Profile Page", HTML));
}

async function post(request, response) {
  const { id } = await model.getSession(request.signedCookies.sid);
  console.log(id, "User Data 🔗");
  const { film, rating } = await request.body;
  return model
    .createReview(id, film, rating)
    .then(() => response.redirect("/profile"));
}

module.exports = { get, post };
