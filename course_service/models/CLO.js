import mongoose from "mongoose";

const CLOSchema = mongoose.Schema({
  description: { type: String, required: true },
  CLO_number: { type: String },
  surveyId: { type: String },
});

const CLO = mongoose.models.CLO || mongoose.model("CLO", CLOSchema);

export { CLO, CLOSchema };
