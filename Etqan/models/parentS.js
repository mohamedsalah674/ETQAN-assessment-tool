import mongoose from "mongoose";
// import childSchema from "./childS.js";

const childSchema = new mongoose.Schema({ name: "string" });

const parentSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  child: childSchema,
});

export default mongoose.models.Parent || mongoose.model("Parent", parentSchema);
