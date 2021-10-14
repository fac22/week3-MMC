"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const server = express();

// Requires
<<<<<<< HEAD
const signup = require("./routes/signup.js");
const login = require("./routes/login.js");
const profile = require("./routes/profile.js");
=======
const signup = require('./routes/signup.js');
const login = require('./routes/logIn.js');
const profile = require('./routes/profile.js');
const logOut = require('./routes/logOut.js');
>>>>>>> 1be0c77746dc8c1859c11c6af192c0186fd58189

server.use(express.urlencoded({ extended: false }));
server.use(express.static("./public"));
server.use(cookieParser(process.env.COOKIE_SECRET));
dotenv.config();

server.get("/profile", profile.get);
server.post("/profile", profile.post);
server.post("/", login.post);
server.get("/", login.get);
server.get("/sign-up", signup.get);
server.post("/sign-up", signup.post);

server.post('/delete', profile.deleteReview);

server.post('/log-out', logOut.post);

const PORT = process.env.PORT || 3003;

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
