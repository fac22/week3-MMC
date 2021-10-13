'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

function createUserAuth(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => model.createUser(email, hashedPassword, name))
    .catch((error) => console.error(error + 'CREATE USER ERROR'));
}

module.exports = {};
