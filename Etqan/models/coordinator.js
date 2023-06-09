import mongoose from "mongoose";
const coordinatorSchema = new mongoose.Schema({
  // marks: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Marks",
  // }, //FK to marks document
  name: { type: "String", required: true },
  role: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  employee_id: { type: "String", required: true },
  program_name: { type: "String", required: true },
  academic_title: { type: "String", required: true },
});

export default mongoose.models.Coordinator ||
  mongoose.model("Coordinator", coordinatorSchema);
