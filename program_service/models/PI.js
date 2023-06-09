import mongoose from "mongoose";

const PISchema = new mongoose.Schema({
  number: Number,
  description: String,
  target: Number,
  achieved: Number,
});

export default mongoose.models.PI || mongoose.model("PI", PISchema);
