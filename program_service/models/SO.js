import mongoose from "mongoose";

const PI = new mongoose.Schema({
  number: { type: Number, required: true },
  description: { type: String, required: true },
  target: Number,
  achieved: Number,
});

const SOSchema = new mongoose.Schema({
  description: { type: String },
  SO_number: { type: Number },
  teaching_methods: { type: [String] },
  CLOs: { type: [Number] },
  PIs: [PI],
  SoAchievementPercent: { type: Number },
});

export default mongoose.models.SO || mongoose.model("SO", SOSchema);
