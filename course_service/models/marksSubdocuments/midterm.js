import mongoose from "mongoose";
const midtermSchema = new mongoose.Schema({
  percent: { type: Number, required: true },
  CLOs: { type: [Number], required: true },
  midterm_number: { type: Number, required: true },
  c_topics: { type: [Number], required: true },
  std_mark: { type: Number, required: true },
  PI: { type: Number, required: true },
});

export default midtermSchema;
