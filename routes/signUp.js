'use strict';

// const html = require('../routes/html.js');
const auth = require('../auth.js');

function get(request, response) {
  response.send(`
    <h1>Create an😄 account</h1>
    <form action="sign-up" method="POST">
      <label for="name">Name<span aria-hidden="true">*</span></label>
      <div id="nameRequirements" class="requirements">
        Name must be at least 2 characters
        long.
      </div>
      <input type="text" id="name" name="name" aria-describedby="nameRequirements nameError" minlength="2" required />
      <div id="nameError" class="error"></div>

      <label for="email">Email<span aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" required />
      <div id="emailError" class="error"></div>


      <label for="password">Password<span aria-hidden="true">*</span></label>
      <div id="passwordRequirements" class="requirements">
        Passwords must be at least 5 characters
        long.
      </div>
      <input type="password" id="password" name="password" aria-describedby="passwordError passwordRequirements" required minlength="5" 
     />
      <div id="passwordError" class="error"></div>
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  console.log('post from signup.js running');
  const { name, email, password } = request.body;
  auth
    .createUserAuth(email, password, name)
    .then(() => response.redirect('/'))
    .catch((error) => console.error(error + 'CREATE USER ERROR'));
}

// name email password

module.exports = { get, post };
