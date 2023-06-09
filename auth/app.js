const express = require('express');
require('express-async-errors');
const cookieSession = require('cookie-session');
const router = require('./routes/auth');
const errorHandler = require('salahorg/middlewares/error-handler');
const NotFoundError = require('salahorg/errors/not-found-error');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(
  cors()


);

app.use(cookieParser());
// app.use(
//   cookieSession({
//     name: 'sessionIdCookie',
//     secret: 'thisshouldbeasecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       secure: true, // cookie is only accessible over HTTP, requires HTTPS
//     },
//   })
// );

app.use(router);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
