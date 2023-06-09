import mongoose from "mongoose";
const {Schema} = mongoose
const instructorSchema = new mongoose.Schema({
  _id : { type : Schema.Types.ObjectId,required: true},
  role: { type: "String", required: true },
  name: { type: "String", required: true },
  program: { type: "Number", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  employee_id: { type: "String", required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  academic_title: { type: "String", required: true },
});

export default mongoose.models.Instructor ||
  mongoose.model("Instructor", instructorSchema);
