require('dotenv').config();
require('./config/ppConfigJwt');
const db = require('./models');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const SERVER_PORT = process.env.SERVER_PORT;
const authController = require('./controllers/auth');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('home route hit!');
});

app.post('/signup', authController.postSignup);
app.post('/login', authController.postLogin);
app.get('/profile', passport.authenticate('jwt', { session: false }),(req, res) => {
  res.send('hit private route successfully!');
});

app.listen(SERVER_PORT, () => console.log(`⚡Running on port ${SERVER_PORT} ⚡️`));