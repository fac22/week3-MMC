'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

async function verifyUser(email, password) {
  const userDetails = await model.getUser(email);
  const passwordCompare = await bcrypt.compare(password, userDetails.password);

  if (!passwordCompare) {
    throw new Error('Password mismatch');
  } else {
    delete userDetails.password;
    return userDetails;
  }
}

function createUserAuth(email, password, name) {
  console.log('createUser from auth.js running');
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => model.createUser(email, hashedPassword, name));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, user);
}

module.exports = { createUserAuth, verifyUser, saveUserSession };
