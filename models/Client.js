const mongoose = require('mongoose');
const ChartSchema = require('./Chart');

const ClientSchema = new mongoose.Schema({
  initials: {
    type: String
  },
  dob: Date,
  allergies: Array,
  charts: [ChartSchema]
});

module.exports = ClientSchema;