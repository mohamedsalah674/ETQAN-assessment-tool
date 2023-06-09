import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String },
  weeks: { type: Number },
  CLOs: { type: [Number] },
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export { Topic, topicSchema };
