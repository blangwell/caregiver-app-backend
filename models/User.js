const mongoose = require('mongoose');
const ClientSchema = require('./Client');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  username: String,
  clients: {
    type: [ClientSchema]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);