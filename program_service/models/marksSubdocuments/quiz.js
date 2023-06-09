import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
  percent: { type: Number, required: true },
  CLOs: { type: [Number], required: true },
  quiz_number: { type: Number, required: true },
  PI: { type: Number, required: true },
  std_mark: { type: Number, required: true },
});

export default quizSchema;
