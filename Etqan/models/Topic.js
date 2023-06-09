import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weeks: { type: Number, required: true },
  CLOs: { type: [Number], required: true },
});

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);
