const mongoose = require("mongoose");
const lab = new mongoose.Schema({
  name: { type: String, required: false },
  percent: { type: Number, required: true },
  lab_number: { type: Number, required: true },
  CLOs: { type: [Number], required: true },
  PI: { type: Number, required: true },
  std_mark: { type: Number, required: true },
  c_topics: { type: [Number], required: true },
});
module.exports = lab;
