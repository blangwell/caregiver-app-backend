const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.postLogin = (req, res) => {
  res.send('logged in!');
}

module.exports.postSignup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ msg: 'An account with this email already exists' });

    const password = req.body.password;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);  
    
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });
    await newUser.save();
    
    req.login(newUser, function(err) {
      if (err) return next(err);
      return res.send('User logged in successfully after signup');
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Error creating user!'});
  };
}

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