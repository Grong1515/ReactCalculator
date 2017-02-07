const mongoose = require('mongoose');

const CalculationSchema = mongoose.Schema({
  calculation: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

exports.Calculation = mongoose.model('Calculation', CalculationSchema);
