"use strict";

const html = require("../routes/html.js");

const model = require("../database/model.js");

function get(request, response) {
  response.send(html("<h1>  hello world</h1>"));
}

module.exports = { get };
