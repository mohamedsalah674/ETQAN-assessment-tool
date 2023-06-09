import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  
  name: { type: "String" }, //FK to marks document
  courses: { type: [], required: true },
  coursesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  abet_criteria: { type: "String" },
  SOs: { type: [], required: true },
  sosIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "SO" }],
  coordinator: { type: mongoose.Schema.Types.ObjectId, ref: "Coordinator" },
  program_code : {type:"String" , required : true}

});

// const Students = models.student || model("student", studentSchema);
// export default Students;
export default mongoose.models.Program ||
  mongoose.model("Program", programSchema);
