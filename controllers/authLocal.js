const User = require('../models/User');

module.exports.postLogin = (req, res) => {
  res.send('logged in!');
}

// module.exports.postSignup = (req, res) => {
  
// }

module.exports.postLogout = (req, res) => {
  // calling logout by itself removes info from req.user
  // session.destroy + clearCookie fully remove the session/cookie
  req.logout();
  req.session.destroy(function(err) {
    if (err) return res.send(err);
    res.clearCookie('connect.sid');
  });
  res.send('logged out successfully');
}