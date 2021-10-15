'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const server = express();

// Requires

const signup = require('./routes/signUp.js');
const login = require('./routes/logIn.js');
const profile = require('./routes/profile.js');
const logOut = require('./routes/logOut.js');
const reviews = require('./routes/reviews.js');

server.use(express.urlencoded({ extended: false }));
server.use(express.static('./public'));
server.use(cookieParser(process.env.COOKIE_SECRET));
dotenv.config();

server.get('/reviews', reviews.get);

server.get('/profile', profile.get);
server.post('/profile', profile.post);

server.post('/', login.post);
server.get('/', login.get);

server.get('/sign-up', signup.get);
server.post('/sign-up', signup.post);

server.post('/delete', profile.deleteReview);

server.post('/log-out', logOut.post);

const PORT = process.env.PORT || 3003;

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
