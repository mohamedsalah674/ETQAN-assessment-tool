import mongoose from "mongoose";
import { topicSchema } from "../models/Topic.js";
import { CLOSchema } from "../models/CLO.js";
const assessmentMethod = new mongoose.Schema({
  assessmentMethod: String,
  methodMark: Number,
  targetPIs: [mongoose.Schema.Types.ObjectId],
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  code: {
    type: "String",
    required: true,
  },
  credits: {
    type: "Number",
    required: true,
  },
  information: {
    type: "String",
    required: true,
  },
  goals: {
    type: "String",
    required: true,
  },
  topics: [topicSchema],
  clos: [CLOSchema],
  clos_codes: [{ type: Number, unique: true }],
  textBook: {
    type: "String",
    required: true,
  },
  instructorName: {
    type: "String",
    required: true,
  },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
  ],
  samples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  marks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marks",
    },
  ],
  selectedAbetCri: {
    type: [Number],
    required: true,
  },
  selectedProgOutcomes: {
    type: [Number],
    required: true,
  },
  ireAssessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IreAssessment",
  },
  assessmentMethods: [assessmentMethod],
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OverallSurvey",
  },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
