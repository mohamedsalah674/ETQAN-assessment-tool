import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: { type: "String" }, //FK to marks document
  courses: { type: [], required: true },
  abet_criteria: { type: "String", required: true },
  SOs: { type: [], required: true },
  coordinator: { type: "String", required: true },
});

// const Students = models.student || model("student", studentSchema);
// export default Students;
export default mongoose.models.program ||
  mongoose.model("program", programSchema);
