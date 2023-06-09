import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
  name: { type: String },
  percent: { type: Number, required: true },
  assignment_no: { type: Number, required: true },
  CLOs: { type: [Number], required: true },
  c_topics: { type: [Number], required: true },
  PI: { type: Number, required: true },
  std_mark: { type: Number, required: true },
});

export default assignmentSchema;
