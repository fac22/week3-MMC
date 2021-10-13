'use strict';

const html = require('../routes/html.js');
const auth = require('../auth.js');

function get(request, response) {
  const html1 = `<section>
    <h1>Create an account</h1>
    <form method="POST">
    <label for="username">
    Name
    <span aria-hidden="true">*</span>
  </label>
  <input id="username" type="username" aria-describedby="usernameError" required />
  <div id="usernameError" class="error"></div>
      <label for="email">
        Email
        <span aria-hidden="true">*</span>
      </label>
      <input id="email" type="email" aria-describedby="emailError" required />
      <div id="emailError" class="error"></div>

      <label for="password">
        Password
        <span aria-hidden="true">*</span>
      </label>
      <div id="passwordRequirements" class="requirements">
        Passwords must contain at least one number, and be at least 3 characters
        long.
      </div>
      <input
        id="password"
        type="password"
        aria-describedby="passwordRequirements passwordError"
        required
        minlength="3"
      />
      <div id="passwordError" class="error"></div>
      <button>Sign up</button>
    </form>
</section>`;

  response.send(html);
}

function post(request, response) {
  const { name, email, password } = request.body;
  auth
    .createUserAuth(email, password, name)
    .catch((error) => console.error(error + 'CREATE USER ERROR'));
}

// name email password

module.exports = { get, post };
