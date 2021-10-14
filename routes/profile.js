'use strict';

const model = require('../database/model.js');
const db = require('../database/connection');
const html = require('../routes/html.js');

function get(request, response) {
  response.send(
    html(
      `<h1>Welcome back name!</h1>
      <h2>List of films</h2>
      <ul>
        <li></li>
      </ul>

      <h2>Add a new film</h2>
      <form action="/" method="POST">
      
        <label for="name">Film name</label>
        <input type="name" id="filmName" name="filmName" required>
        <label for="director">Director</label>
        <input type="name" id="filmDirector" name="filmDirector" required>
        <label for="pet-select">Choose a pet:</label>
        <label for="pet-select">Choose a pet:</label>
        <select name="potatoes" id="potato-rating">
          <option value="">--Please choose a rating--</option>
          <option value="1">🥔</option>
          <option value="2">🥔🥔</option>
          <option value="3">🥔🥔🥔</option>
          <option value="4">🥔🥔🥔🥔</option>
          <option value="5">🥔🥔🥔🥔🥔</option>
        </select>


        <button>Log in</button>
      </form>
      <form action="sign-up">
      rs
      <button>Sign-Up</button>
      </form>
    `
    )
  );
}

module.exports = { get };
