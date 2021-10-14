'use strict';

const auth = require('../auth.js');
const html = require('./html.js');

function get(request, response) {
  const HTML = `  <section>
    <header>
      <div class="flex flex--column box ">
        <div class="bubble-1">
          <h1>Mouldy Potatoes 🥔 Film Review Site</h1>
        </div>
        <form action="/" method="POST" class="margin--top">
          <label for="email">Email<span aria-hidden="true"> *</span></label>
          <input type="email" name="email" id="email" placeholder="Enter your email" required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" />
          <label for="password">Password<span aria-hidden="true"> *</span></label>
          <input type="password" id="password" name="password" required="" placeholder="Enter Password">
          <button>Log in</button>
        </form>
      </div>
      <div>
        <form action="sign-up" class="flex flex--column box flex--center">
          <button class="create--account">Create Account</button>
        </form>
      </div>
    </section>
    `;
  const sid = request.signedCookies.sid;
  if (sid) {
    response.redirect('/profile');
  }
  response.send(html.htmlBuilder('Login', HTML));
}

function post(request, response) {
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then((user) => auth.saveUserSession(user))
    .then((sid) =>
      response.cookie('sid', sid, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: 'strict',
        signed: true,
      })
    )
    .then(() => response.redirect('/'))
    .catch((error) => console.error(error + ' 🙂 User not found'));
}

module.exports = { get, post };
