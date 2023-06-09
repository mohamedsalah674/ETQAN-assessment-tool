import mongoose from "mongoose";

// const surveySchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   students_rate: { type: [Number], required: true },
//   target_rate: { type: Number, required: true },
// });

const CLOSchema = mongoose.Schema({
  description: { type: String, required: true },
  CLO_number: { type: Number, required: true },
  // teaching_methods: { type: [String], required: true },
  // SOs: { type: [Number], required: true },
  // survey: { type: surveySchema, required: true },
});

export default mongoose.models.CLO || mongoose.model("CLO", CLOSchema);
