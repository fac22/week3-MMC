'use strict';

const database = require('./connection.js');

function createUser(email, hashedPassword, name) {
  console.log('createUser from model.js running');
  const INSERT_USER = `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
  RETURNING id, email, name;`;
  return database
    .query(INSERT_USER, [email, hashedPassword, name])
    .then((user) => user.rows[0]);
}

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

function createReview(userID, film, rating) {
  const INSERT_REVIEW = `
  INSERT INTO potatoes (reviewer, film, rating) VALUES ($1, $2, $3);`;
  return database
    .query(INSERT_REVIEW, [userID, film, rating])
    .then((review) => review.rows[0]);
}

function getReviews(userID) {
  const SELECT_REVIEWS = `SELECT id, film, rating FROM potatoes WHERE reviewer = $1`;
  return database.query(SELECT_REVIEWS, [userID]).then((review) => review.rows);
}


function deleteReview(id) {
  console.log('DELETE REVIEW MODEL.JS');
  const DELETE_REVIEW = `
  DELETE FROM potatoes WHERE id=$1;`;
  return database.query(DELETE_REVIEW, [id]);
}
  
function deleteSession(sid) {
  const DELETE_SESSION = 'DELETE FROM sessions WHERE sid=$1';
  return database.query(DELETE_SESSION, [sid]);
}

module.exports = {
  createUser,
  getUser,
  getSession,
  createSession,
  createReview,
  getReviews,

  deleteReview,

  deleteSession

};
