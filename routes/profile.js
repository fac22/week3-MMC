'use strict';

const model = require('../database/model.js');
const db = require('../database/connection');

function get(request, response) {
  response.send('YOU ARE LOGGED IN HERE IS YOUR PROFILE 😎');
}

module.exports = { get };
