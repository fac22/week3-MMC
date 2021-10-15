'use strict';

const model = require('../database/model.js');
const db = require('../database/connection');
const html = require('../routes/html.js');

function howManyPotatoes(number) {
  switch (number) {
    case 1:
      return '🥔';
    case 2:
      return '🥔🥔';
    case 3:
      return '🥔🥔🥔';
    case 4:
      return '🥔🥔🥔🥔';
    case 5:
      return '🥔🥔🥔🥔🥔';
    default:
      return '🥔';
  }
}

async function get(request, response) {
  if (!request.signedCookies.sid) {
    response.redirect('/');
  } else {
    const { id } = await model.getSession(request.signedCookies.sid);
    const reviews = await model.getReviews(id);
    const score = await Math.round(
      ((await model.getReviews(id)).length * 1000) / 1.25
    );
    const name = await model.getUserName(id);
    const reviewHTML = reviews
      .map((review) => {
        return `<div class="flex flex--row box flex--center flex--space--between">
          <h3>${review.film}</h3>- ${howManyPotatoes(review.rating)} -
          <button name="delete" class="delete" value="${
            review.id
          }">Delete</button>
        </div>`;
      })
      .join('');

    const HTML = `<section>
      <header>
        <div class="flex flex--column box ">
          <div class="bubble-2">
            <h1>Hey ${name.name} welcome back!</h1>
          </div>
          <div class="bubble-1">🥔 Potato Score: ${score}</div>
          <form action="/log-out" method="POST">
            <button>Log out</button>
          </form>
        </div>
      </header>
    </section>

    <section>
      <form method="POST" action="/delete">
      ${reviewHTML}
      </form>
    </section>

    <section>
      <div class="flex flex--column box">
        <form action="profile" method="POST">
          <h2>Review a film</h2>
          <label class="hidden" for="film">Film Title</label>
          <input type="text" id="film" name="film" placeholder="Enter the title of the film" required="">
          <label class="hidden" for="rating">Rating</label>
          <select name="rating" id="rating">
            <option value="">Choose a rating</option>
            <option value="1" aria-describedby="1 Potato">🥔</option>
            <option value="2" aria-describedby="2 Potatoes">🥔🥔</option>
            <option value="3" aria-describedby="3 Potatoes">🥔🥔🥔</option>
            <option value="4" aria-describedby="4 Potatoes">🥔🥔🥔🥔</option>
            <option value="5" aria-describedby="5 Potatoes">🥔🥔🥔🥔🥔</option>
          </select>
          <button class="add--review">Add Review</button>
        </form>
    </section>
  `;

    return response.send(html.htmlBuilder('Profile Page', HTML));
  }
}

async function post(request, response) {
  const { id } = await model.getSession(request.signedCookies.sid);
  console.log(id, 'User Data 🔗');
  const { film, rating } = await request.body;
  return model
    .createReview(id, film, rating)
    .then(() => response.redirect('/profile'));
}

async function deleteReview(request, response) {
  console.log('DELETE FUNCTION IN PROFILE.JS');
  const body = await request.body;
  return model
    .deleteReview(body.delete)
    .then(() => response.redirect('/profile'));
}

module.exports = { get, post, deleteReview };
