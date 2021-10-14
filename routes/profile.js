'use strict';

const model = require('../database/model.js');
const db = require('../database/connection');
const html = require('../routes/html.js');

function get(request, response) {
  const HTML = `
     
    <form action="/" method="POST">
    <h2>Add a new film</h2>
        <label for="name">Film Title</label>
        <input type="text" id="filmName" name="filmName" placeholder="Please enter the title of the film" required>
        <label for="pet-select">Rating</label>
        <select name="potatoes" id="potato-rating">
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
  return response.send(html.htmlBuilder('Profile Page', HTML));
}

module.exports = { get };
