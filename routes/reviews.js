'use strict';

const model = require('../database/model.js');
const db = require('../database/connection');
const html = require('../routes/html.js');

function filterRatings(films, film) {
  console.log(films.length);
  return films
    .filter((review) => {
      if (review.film === film) {
        return film;
      }
    })
    .map((film, i) => {
      return film.rating;
    })
    .reduce((acc, val) => {
      return acc + val;
    });
}

function get(request, response) {
  const HTML = `
 
  `;

  model
    .getAllReviews()
    .then((films) => {
      return films.reduce((acc, review, array) => {
        let { film } = review;
        let ratings = filterRatings(films, film);
        return { ...acc, [film]: [ratings] };
      }, {});
    })
    .then((values) => {
      return Object.entries(values)
        .map((film) => {
          return `<div class="flex flex--row box flex--center flex--space--between">
          <h3>${film} 🥔</h3></div>`;
        })
        .join('');
    })

    .then((result) => response.send(html.htmlBuilder('Reviews', result)));
}

module.exports = { get };
