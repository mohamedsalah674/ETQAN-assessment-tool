import mongoose from "mongoose";
import quizSchema from "../models/marksSubdocuments/quiz.js";
import midtermSchema from "../models/marksSubdocuments/midterm.js";
import progressExamSchema from "../models/marksSubdocuments/progress_exam.js";
import projectSchema from "../models/marksSubdocuments/project.js";
import labSchema from "../models/marksSubdocuments/lab.js";
import assignmentSchema from "../models/marksSubdocuments/assignment.js";
import finalExamSchema from "../models/marksSubdocuments/final_exam.js";

const marks = new mongoose.Schema({
  student_name: { type: "String", default: "OO" },
  quizzes: [quizSchema],
  midterms: [midtermSchema],
  progress_exams: [progressExamSchema],
  projects: [projectSchema],
  labs: [labSchema],
  assignments: [assignmentSchema],
  final_exam: finalExamSchema,
  total_marks: { type: Number },
});

export default mongoose.models.Marks || mongoose.model("Marks", marks);
