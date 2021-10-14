"use strict";

// const html = require('../routes/html.js');
const auth = require("../auth.js");

function get(request, response) {
  response.send(`
    <h1>Create an😄 account</h1>
    <form action="sign-up" method="POST">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  console.log("post from signup.js running");
  const { name, email, password } = request.body;
  auth
    .createUserAuth(email, password, name)
    .then(() => response.redirect("/"))
    .catch((error) => console.error(error + "CREATE USER ERROR"));
}

// name email password

module.exports = { get, post };
