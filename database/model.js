'use strict';

const database = require('./connection.js');

// Function needs to be passed hashedPassword from auth.js
function createUser(email, hashedPassword, name) {
  console.log('createUser from model.js running');
  const INSERT_USER = `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
  RETURNING id, email, name;`;
  return database
    .query(INSERT_USER, [email, hashedPassword, name])
    .then((user) => user.rows[0]);
}

// GET user from email
// Email is UNIQUE
function getUser(email) {
  const SELECT_USER =
    'SELECT id, email, password, name FROM users WHERE email=$1';
  return database.query(SELECT_USER, [email]).then((user) => user.rows[0]);
}

function getSession(sid) {
  const SELECT_SESSION = 'SELECT data FROM sessions WHERE sid=$1';
  return database.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return database
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

module.exports = { createUser, getUser, getSession, createSession };
