import mongoose from "mongoose";
const IreAssessmentSchema = new mongoose.Schema({
  ireSosArray: [
    {
      soId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SO",
      },
      pis: [
        {
          piId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          piValue: {
            type: String,
            enum: ["I", "R", "E"],
            required: true,
          },
        },
      ],
    },
  ],
});

export default mongoose.models.IreAssessment ||
  mongoose.model("IreAssessment", IreAssessmentSchema);
