import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  description: { type: String, required: true },
  students_rate: { type: [Number], required: true },
  target_rate: { type: Number, required: true },
});

export default mongoose.models.Survey || mongoose.model("survey", surveySchema);
