import mongoose from "mongoose";

const PISchema = new mongoose.Schema({ number: Number, description: String });

export default mongoose.models.PI || mongoose.model("PI", PISchema);
