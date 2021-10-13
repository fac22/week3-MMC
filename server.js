'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });
const dotenv = require('dotenv');
dotenv.config();

const server = express();

const home = require('./routes/home.js');
const signUp = require('./routes/signup.js');

// const logIn = require("./routes/logIn.js");
// const signUp = require("./routes/signUp.js");
// const logOut = require("./routes/logOut.js");
// const posts = require("./routes/posts.js");

// server.use(express.urlencoded({ extended: false }));

// COOKIE_SECRET lives in .env to stop it ending up on GitHub
// it is used to sign cookies so we can trust them
// server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/sign-up', signUp.get);
server.post('/sign-up', bodyParser, signUp.post);

// server.get("/log-in", logIn.get);

const PORT = process.env.PORT || 3003;

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
