const mongoose = require('mongoose');

const ChartSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  sleep: Number,
  fluidIntake: Number,
  pain: Number,
  foodWater: [{
    fluidIntake: Number,
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
    notes: String
  }],
  hygiene: [{
    shower: Boolean,
    bath: Boolean,
    bedBath: Boolean,
    periCare: Boolean,
    oralCare: Boolean,
    shave: Boolean
  }],
  mobility: [{
    transfer: Boolean,
    ambulate: Boolean,
    walker: Boolean,
    wheelchair: Boolean
  }],
  toileting: [{
    incontinent: Boolean,
    urineOutput: Number,
    bm: Boolean,
    bmSize: String,
    bmLoose: Boolean,
    bmMucous: Boolean,
    bmBloody: Boolean,
    notes: String
  }],
  notes: String,
}, { timestamps: true });

module.exports = ChartSchema;