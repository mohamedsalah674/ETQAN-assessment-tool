import mongoose from "mongoose";

const PISchema = new mongoose.Schema({
  number: { type: Number, required: true },
  description: { type: String, required: true },
  target: Number,
  achieved: Number,
});

export default mongoose.models.PI || mongoose.model("PI", PISchema);
