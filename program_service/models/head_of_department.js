import mongoose from "mongoose";
const head_of_departmentSchema = new mongoose.Schema({

  name: { type: "String", required: true },
  role: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  department_name: { type: "String", required: true },
  academic_title: { type: "String", required: true },
});

export default mongoose.models.Head_of_department ||
  mongoose.model("Head_of_department", head_of_departmentSchema);
