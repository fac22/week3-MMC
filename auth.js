'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

// function verifyUser(email, password) {
//   return model
//     .getUser(email)
//     .then((user) => bcrypt.compare(password, user.password))
//     .then((user) => {
//       if (!user) {
//         throw new Error('Password mismatch');
//       } else {
//         // make sure we never return the password
//         // delete user.password;
//         return user;
//       }
//     });
// }

async function verifyUser(email, password) {
  const userDetails = await model.getUser(email);
  const passwordCompare = await bcrypt.compare(password, userDetails.password);

  if (!passwordCompare) {
    throw new Error('Password mismatch');
  } else {
    // make sure we never return the password
    // delete user.password;
    delete userDetails.password;
    return userDetails;
  }
}

function createUserAuth(email, password, name) {
  console.log('createUser from auth.js running');
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => model.createUser(email, hashedPassword, name));
  // .catch((error) => console.error(error + 'CREATE USER ERROR'));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, user);
}

module.exports = { createUserAuth, verifyUser, saveUserSession };
