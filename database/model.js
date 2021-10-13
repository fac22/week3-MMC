'use strict';

const database = require('./connection.js');

// Function needs to be passed hashedPassword from auth.js
function createUser(email, hashedPassword, name) {
  const INSERT_USER = `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
  RETURNING id, email, name;`;
  return database
    .query(INSERT_USER, [email, hashedPassword, name])
    .then((user) => user.rows[0]);
}

// GET user from email
// Email is UNIQUE
function getUser(email) {
  const SELECT_USER = 'SELECT * FROM users WHERE email=$1';
  return database.query(SELECT_USER, [email]).then((user) => user.rows[0]);
}

module.exports = { createUser, getUser };
