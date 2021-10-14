'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });
const dotenv = require('dotenv');
dotenv.config();

const server = express();

const signUp = require('./routes/signup.js');
const login = require('./routes/logIn.js');
const profile = require('./routes/profile.js');

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/profile', profile.get);

server.post('/', login.post);
server.get('/', login.get);

server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);

// server.get("/log-in", logIn.get);

const PORT = process.env.PORT || 3003;

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
