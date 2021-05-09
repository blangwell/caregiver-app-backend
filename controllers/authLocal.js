const User = require('../models/User');

module.exports.postLogin = (req, res) => {
  res.redirect('/profile');
}