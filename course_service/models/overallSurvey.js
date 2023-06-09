import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = new mongoose.Schema({
  questionNumber: Number,
  questionTitle: String,
  questionDescription: String,
  answers: [String],
});

const overallSurveySchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  rates: [{ type: Number }],
  questions: [questionSchema],
  survey_id: {
    type: String,
    default: uuidv4, // Generate a UUID as the default value
    unique: true,
  },
  comments: [String],
});

export default mongoose.models.OverallSurvey ||
  mongoose.model("OverallSurvey", overallSurveySchema);
