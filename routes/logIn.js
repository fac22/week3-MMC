'use strict';

const auth = require('../auth.js');
const profile = require('../routes/profile.js');
const html = require('../routes/html.js');

// log in form
// login form
function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    response.redirect('/profile');
  }
  //   response.send('<h1>Hello 😢</h1>');
  response.send(
    html(
      `<h1>Hello, welcome to MMC!</h1>
      <h2>Log in here</h2>
      <form action="/" method="POST">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
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
