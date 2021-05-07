const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');

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

    const jwtPayload = {
      id: newUser.id,
      email: newUser.email
    };

    // sign and send token
    const token = await jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: 60 });
    return res.json({ token });

  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Error creating user!'});
  };
};

module.exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ msg: 'No user found with that email address' });
    const matchPasswords = await bcrypt.compare(req.body.password, user.password);
    if (!matchPasswords) return res.status(400).json({ msg: 'Incorrect password' });

    const jwtPayload = {
      id: user.id,
      email: user.email
    };

    const token = await jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: 3600 });
    return res.json({ token });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error logging in' });
  };
};