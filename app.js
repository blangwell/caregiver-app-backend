require('dotenv').config();
require('./config/ppConfigLocal');
require('./models');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const SERVER_PORT = process.env.SERVER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const authControllerLocal = require('./controllers/authLocal');
const userControllerLocal = require('./controllers/userLocal');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('express-session')({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('home route hit!'));
app.post('/signup', authControllerLocal.postSignup);
app.post('/login', passport.authenticate('local'), authControllerLocal.postLogin);
app.post('/logout', authControllerLocal.postLogout);

app.get('/profile', passport.authenticate('local'), userControllerLocal.getProfile);

app.listen(SERVER_PORT, () => console.log(`⚡Running on port ${SERVER_PORT} ⚡️`));