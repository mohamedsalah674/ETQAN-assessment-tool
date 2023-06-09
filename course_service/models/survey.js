import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  comment: { type: String },
  rate: { type: Number },
});

const surveySchema = new mongoose.Schema({
  description: { type: String },
  students_responses: { type: [responseSchema] },
  target_rate: { type: Number },
  survey_id: { type: String },
});

export default mongoose.models.Survey || mongoose.model("Survey", surveySchema);
