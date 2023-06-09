import mongoose from "mongoose";
const instructorSchema = new mongoose.Schema({
  // marks: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Marks",
  // }, //FK to marks document
  role: { type: "String", required: true },
  name: { type: "String", required: true },
  program: { type: "Number", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  employee_id: { type: "String", required: true },
  courses: { type: [String], required: true },
  academic_title: { type: "String", required: true },
});

// const Instructors = models.instructor || model("instructor", instructorSchema);
// export default Instructors;
export default mongoose.models.Instructor ||
  mongoose.model("Instructor", instructorSchema);
