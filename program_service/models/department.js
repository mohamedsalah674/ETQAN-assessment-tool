import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: "String" }, //FK to marks document
  programs: { type: [], required: true },
  programsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
  head_of_department: { type: mongoose.Schema.Types.ObjectId, ref: "Head_of_department" },
  department_code: {type:"String" , required : true}
});

// const Students = models.student || model("student", studentSchema);
// export default Students;
export default mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);
