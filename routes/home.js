"use strict";

const model = require("../database/model.js");

function get(request, response) {
  const html = /*html*/ `
    <h1> hello world </h1>
    `;
  response.send(html);
}

module.exports = { get };
