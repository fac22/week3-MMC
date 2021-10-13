"use strict";

const html = require("../routes/html.js");

const model = require("../database/model.js");
const auth = require("../auth.js");

// login form
function get(request, response) {
  response.send(html(
      `<h1>Hello, welcome to MMC!</h1>
      <h2>Log in here</h2>
      <form action="log-in" method="POST">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
        <button>Log in</button>
      </form>
    `
  ))
}


function post(request, response){
  const {email, password} = request.body;
  auth.verifyUser(email)
  .then((user) => auth.saveUserSession(user))
  .then((sid) => response.cookie("sid", sid, {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "strict",
    signed: true,
  }))
  .then(() => response.redirect("sign-up"))
  .catch((error) => console.error(error + "User not found"));
}


module.exports = { get, post };
