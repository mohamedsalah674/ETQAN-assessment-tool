import mongoose from "mongoose";
const courseMarks = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  marks: [
    {
      assessmentMethodId: { type: mongoose.Schema.Types.ObjectId },
      studentMark: { type: Number },
    },
  ],
});

const studentSchema = new mongoose.Schema({
  marks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marks",
  }, //FK to marks document
  name: { type: "String", required: true },
  year: { type: "Number", required: true },
  depart_name: { type: "String", required: true },
  date_of_birth: { type: "Date", required: true },
  email: { type: "String", required: true },
  password: { type: "String", default: "123456", required: false },
  student_id: { type: "String", required: true },
  phone: { type: "String", required: true },
  address: { type: "String", required: true },
  role: { type: "String", default: "student", required: false },
  coursesMarks: [courseMarks],
  PI_marks: [
    {
      PI_mark: { type: "Number", default: 0 },
      PI_Id: { type: mongoose.Schema.Types.ObjectId },
      SO_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SO",
      },
    },
  ],
});

// const Students = models.student || model("student", studentSchema);
// export default Students;
export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
