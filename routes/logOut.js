'use strict';

const { deleteSession } = require('../database/model.js');
const db = require('../database/connection');

function post(request, response) {
  const sid = request.signedCookies.sid;
  deleteSession(sid).then(() => {
    response.clearCookie('sid');
    response.redirect('/');
  });
}

module.exports = { post };
