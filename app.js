require('dotenv').config();
// require('./config/ppConfigJwt');
require('./config/ppConfigLocal');
const db = require('./models');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const SERVER_PORT = process.env.SERVER_PORT;
const authController = require('./controllers/auth');
const authControllerLocal = require('./controllers/authLocal');

// const session = require('express-session')({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// });

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('home route hit!');
});

// app.post('/signup', authController.postSignup);
// app.post('/login', authController.postLogin);
// app.post('/signup', authControllerLocal.postSignup);
app.post('/login', (req, res, next) => passport.authenticate('local', {failureMessage: 'Couldn\'t login'})(req, res, next));
// app.get('/profile', passport.authenticate('jwt', { session: false }),(req, res) => {
//   res.send('hit private route successfully!');
// });
app.get('/profile', passport.authenticate('local', {failureMessage: 'must be logged in'}) , (req, res) => {
  res.send('hit private route successfully!');
});

app.listen(SERVER_PORT, () => console.log(`⚡Running on port ${SERVER_PORT} ⚡️`));