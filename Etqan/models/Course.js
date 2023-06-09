import mongoose from "mongoose";

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
  topics: {
    type: "String",
    required: true,
  },
  textBook: {
    type: "String",
    required: true,
  },
  instructorName: {
    type: "String",
    required: true,
  },
  selectedAbetCri: {
    type: [Number],
    required: true,
  },
  selectedProgOutcomes: {
    type: [Number],
    required: true,
  },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
