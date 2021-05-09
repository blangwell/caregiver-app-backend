const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, 
function(username, password, cb) {
  User.findOne({ email: username }, async function(err, user) {
    if (err) {
      console.log(err);
      return cb(err);
    }
    if (!user) {
      console.log('no user found!')
      return cb(null, false);
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      console.log('passwords don\'t match');
      return cb(null, false);
    }
    return cb(null, user);
  });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
});