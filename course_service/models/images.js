import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  publicId: {
    type: String,
  },
  description: {
    type: String,
  },
});

// module.exports = mongoose.model("Image", imageSchema);
export default mongoose.models.Image || mongoose.model("Image", imageSchema);
