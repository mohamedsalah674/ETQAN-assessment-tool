import mongoose from "mongoose";
const {Schema} = mongoose
const coordinatorSchema = new mongoose.Schema({
  _id : { type : Schema.Types.ObjectId,required: true},
  name: { type: "String", required: true },
  role: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  employee_id: { type: "String", required: true },
  program_name: { type: "String", required: true },
  academic_title: { type: "String", required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },

});

export default mongoose.models.Coordinator ||
  mongoose.model("Coordinator", coordinatorSchema);
